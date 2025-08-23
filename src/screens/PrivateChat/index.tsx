import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useGetMessages } from 'entities/chat/api/useGetMessages.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import {
  ChatMessageProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
import { PrivateChatRouteProp } from 'screens/PrivateChat/types.ts';
import { ChatHeader } from 'screens/PrivateChat/ui/Header.tsx';
import { Message } from 'screens/PrivateChat/ui/Message.tsx';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { KeyboardAvoidWrapper } from 'shared/ui/KeyboardAvoid/KeyboardAvoidWrapper.tsx';
import { TextInputAction } from 'shared/ui/TextInputAction';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const PrivateChatScreen = () => {
  const listRef = useRef<FlatList<ChatMessageProps>>(null);

  const selfProfile = useSelfProfile();
  const { params } = useRoute<PrivateChatRouteProp>();

  const [chatId, setChatId] = useState<string | null>(params.chatId || null);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [text, setText] = useState('');

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

  const { loading } = useGetMessages({
    chatId,
    setMessages,
  });

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (!chatId) {
        startTransition(() => setChatId(msg.chatId));
      }
      if (msg.chatId === chatId) {
        setMessages((prev) => [msg, ...prev]);

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

  const renderMessage = useCallback(
    ({ item }: ListRenderItemInfo<ChatMessageProps>) => {
      if (!selfProfile) return null;
      return (
        <Message
          from={item.from}
          text={item.text}
          createdAt={item.createdAt}
          selfId={selfProfile.id}
        />
      );
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
              keyExtractor={(item) => item._id}
              data={messages}
              renderItem={renderMessage}
              maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
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
