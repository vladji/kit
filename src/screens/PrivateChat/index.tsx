import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useFetchMessagesLatest } from 'entities/chat/api/useFetchMessagesLatest.ts';
import { useGetMessagesBefore } from 'entities/chat/api/useGetMessagesBefore.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import {
  ChatDateProps,
  ChatMessageProps,
  MessagesListProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
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
  const [messages, setMessages] = useState<MessagesListProps[]>([]);
  const [text, setText] = useState('');

  const { loading } = useFetchMessagesLatest({
    chatId,
    setMessages,
  });

  const { mutate: getMessagesBefore } = useGetMessagesBefore({
    messagesState: messages,
    setMessages,
  });

  const scrollToIndex = useCallback(
    ({ animated = false }: { animated?: boolean }) => {
      requestAnimationFrame(() => {
        if (messages.length) {
          listRef.current?.scrollToIndex({
            index: 0,
            animated,
          });
        }
      });
    },
    [messages.length],
  );

  const onEndReached = useCallback(async () => {
    const firstMessage = messages[messages.length - 1];
    if (firstMessage.type === 'message') {
      getMessagesBefore({ chatId, messageId: firstMessage.id });
    }
  }, [chatId, messages, getMessagesBefore]);

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (!chatId) {
        startTransition(() => setChatId(msg.chatId));
      }
      if (msg.chatId === chatId) {
        setMessages((prev) => [{ type: 'message', ...msg }, ...prev]);

        const fromSelf = msg.from === selfProfile?.id;
        if (fromSelf) {
          requestAnimationFrame(() => scrollToIndex({ animated: true }));
        }
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId, scrollToIndex, selfProfile?.id]);

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
              data={messages}
              renderItem={renderItem}
              maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
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
