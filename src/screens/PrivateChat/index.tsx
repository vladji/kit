import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useFetchMessagesLatest } from 'entities/chat/api/useFetchMessagesLatest.ts';
import { useGetMessagesAfter } from 'entities/chat/api/useGetMessagesAfter.ts';
import { useGetMessagesBefore } from 'entities/chat/api/useGetMessagesBefore.ts';
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
import { getMessageAtIndex } from 'entities/chat/utils/getChatItemAtIndex.ts';
import { PrivateChatRouteProp } from 'screens/PrivateChat/types.ts';
import { Date } from 'screens/PrivateChat/ui/Date.tsx';
import { ChatHeader } from 'screens/PrivateChat/ui/Header.tsx';
import { Message } from 'screens/PrivateChat/ui/Message.tsx';
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

  const { loading } = useFetchMessagesLatest({
    chatId,
    setMessages,
  });

  const [isTransition, startTransition] = useTransition();

  const { mutate: getMessagesBefore, isPending: messagesBeforeLoading } =
    useGetMessagesBefore({
      messagesState: messages,
      setMessages,
      startTransition,
    });

  const { mutate: getMessagesAfter, isPending: messagesAfterLoading } =
    useGetMessagesAfter({
      setMessages,
      startTransition,
    });

  const onEndReached = useCallback(async () => {
    const { item: firstMessage } = getMessageAtIndex(-1, messages);
    if (firstMessage?.id && !messagesBeforeLoading && !isTransition) {
      getMessagesBefore({ chatId, messageId: firstMessage.id });
    }
  }, [
    chatId,
    messages,
    getMessagesBefore,
    messagesBeforeLoading,
    isTransition,
  ]);

  const onStartReached = useCallback(() => {
    const { item: lastMessage } = getMessageAtIndex(0, messages);
    if (lastMessage?.id && !messagesAfterLoading && !isTransition) {
      getMessagesAfter({ chatId, messageId: lastMessage.id });
    }
  }, [chatId, messages, getMessagesAfter, messagesAfterLoading, isTransition]);

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
  }, [chatId, setLocalMessage]);

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
    <ScreenLayout
      headerContent={<ChatHeader />}
      loading={loading}
      hasBackButton
    >
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
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 100,
              }}
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
              onStartReachedThreshold={0.5}
              onStartReached={onStartReached}
              inverted
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
