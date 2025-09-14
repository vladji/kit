import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, View, ViewToken } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useGetMessagesAround } from 'entities/chat/api/useGetMessagesAround.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import {
  ChatDateProps,
  ChatMessageProps,
  MessagesListProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useDeferredMessages } from 'entities/chat/model/useDeferredMessages.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
import { useSetLocalMessage } from 'entities/chat/model/useSetLocalMessage.tsx';
import { useFetchMessages } from 'screens/PrivateChat/model/useFetchMessages.ts';
import { PrivateChatRouteProp } from 'screens/PrivateChat/types.ts';
import { Date } from 'screens/PrivateChat/ui/Date.tsx';
import { ChatHeader } from 'screens/PrivateChat/ui/Header.tsx';
import { Message } from 'screens/PrivateChat/ui/Message.tsx';
import { useDebounce } from 'shared/lib/useDebounce.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { KeyboardAvoidWrapper } from 'shared/ui/KeyboardAvoid/KeyboardAvoidWrapper.tsx';
import { TextInputAction } from 'shared/ui/TextInputAction';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const PrivateChatScreen = () => {
  const listRef = useRef<FlatList<MessagesListProps>>(null);

  const selfProfile = useSelfProfile();
  const { params } = useRoute<PrivateChatRouteProp>();

  const [chatId, setChatId] = useState<string | null>(params.chatId || null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<MessagesListProps[]>([]);

  const deferredMessages = useDeferredMessages(messages);

  const setLocalMessage = useSetLocalMessage({
    messagesState: messages,
    setMessages,
  });

  useGetMessagesAround({ chatId, setMessages });

  const { startTransition, onStartReached, onEndReached } = useFetchMessages({
    messages,
    setMessages,
    chatId,
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<MessagesListProps>[];
  }) => {
    const ids = viewableItems
      .filter((item) => item.item.type === 'message' && !item.item.read)
      ?.map((item) => item.key)
      .join(',');
    // console.log('ids', ids);
    // safeSocket()?.emit('test', ids);
  };

  const debouncedOnViewableItemsChanged = useDebounce<{
    viewableItems: ViewToken<MessagesListProps>[];
  }>(onViewableItemsChanged, 500)();

  const scrollTo = useCallback((index: number) => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        index,
        animated: false,
        viewPosition: 0,
      });
    });
  }, []);

  useEffect(() => {
    // requestAnimationFrame(() => {
    //   if (!deferredMessages.length) return;
    //
    //   listRef.current?.scrollToIndex({
    //     index: deferredMessages.length - 1,
    //     animated: false,
    //     viewPosition: 0,
    //   });
    // });
  }, [deferredMessages]);

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (!chatId) {
        startTransition(() => setChatId(msg.chatId));
      }
      if (msg.chatId === chatId) {
        setLocalMessage(msg);
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId, setLocalMessage, startTransition]);

  const sendMessage = () => {
    if (!selfProfile || !params.peer.id || !text) return;

    const privateMessage: PrivateMessageProps = {
      from: selfProfile,
      to: params.peer,
      text,
      knownChatId: chatId,
    };
    safeSocket()?.emit('private_message', privateMessage);
    startTransition(() => setText(''));
    scrollTo(deferredMessages.length - 1);
  };

  const renderItem = useCallback(
    ({ item }: { item: MessagesListProps }) => {
      if (!selfProfile) return null;
      if (item.type === 'message') {
        const message = item as ChatMessageProps;
        return (
          <Message
            id={message.id}
            from={message.from}
            text={message.text}
            createdAt={message.createdAt}
            selfId={selfProfile.id}
            read={message.read}
          />
        );
      }
      if (item.type === 'date') {
        const date = (item as ChatDateProps).date;
        return <Date date={date} />;
      }
      return null;
    },
    [selfProfile],
  );

  return (
    <ScreenLayout headerContent={<ChatHeader />} hasBackButton>
      {!!selfProfile && (
        <View style={styles.wrapper}>
          <Image
            style={StyleSheet.absoluteFill}
            source={require('shared/assets/images/pattern-hexagon.jpg')}
            resizeMode="cover"
          />
          <KeyboardAvoidWrapper style={styles.contentWrapper} includeSafeBottom>
            <FlatList
              ref={listRef}
              contentContainerStyle={styles.scrollContent}
              initialNumToRender={MESSAGES_DEFAULT_LIMIT}
              keyExtractor={(item) => item.id}
              data={deferredMessages}
              renderItem={renderItem}
              onStartReachedThreshold={1}
              onStartReached={onStartReached}
              onEndReachedThreshold={1}
              onEndReached={onEndReached}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
              onViewableItemsChanged={debouncedOnViewableItemsChanged}
              // onScrollToIndexFailed={(info) => {
              //   requestAnimationFrame(() => {
              //     listRef.current?.scrollToOffset({
              //       offset: info.averageItemLength * info.index,
              //       animated: false,
              //     });
              //   });
              // }}
              // inverted
            />
            <View style={styles.inputBlock}>
              <TextInputAction
                inputValue={text}
                onChangeText={setText}
                onPress={sendMessage}
                Icon={Send}
                chatting
              />
            </View>
          </KeyboardAvoidWrapper>
        </View>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: lightTheme.main,
    overflow: 'hidden',
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    gap: SPACING.NANO,
    paddingVertical: SPACING.MINI,
    paddingHorizontal: SPACING.DEFAULT,
  },
  inputBlock: {
    paddingVertical: SPACING.MINI_S,
    paddingHorizontal: SPACING.DEFAULT,
    backgroundColor: lightTheme.main,
  },
});
