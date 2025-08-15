import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { RootRouter, RootStackParams } from 'app/router/RootRouter/types.ts';
import { useGetMessages } from 'entities/chat/api/useGetMessages.ts';
import {
  ChatMessageProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
import { Message } from 'screens/PrivateChat/ui/Message.tsx';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { KeyboardAvoidWrapper } from 'shared/ui/KeyboardAvoid/KeyboardAvoidWrapper.tsx';
import { TextInputAction } from 'shared/ui/TextInputAction';
import { ScreenLayout } from 'widgets/ScreenLayout';

type PrivateChatRouteProp = RouteProp<
  RootStackParams,
  RootRouter.PrivateChatRoute
>;

export const PrivateChatScreen = () => {
  const selfProfile = useSelfProfile();
  const { params } = useRoute<PrivateChatRouteProp>();

  const [chatId, setChatId] = useState<string | null>(params.chatId || null);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [text, setText] = useState('');

  const { loading } = useGetMessages({
    chatId,
    setMessages,
  });

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (!chatId) {
        setChatId(msg.chatId);
      }
      if (msg.chatId === chatId) {
        setMessages((prev) => [msg, ...prev]);
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId]);

  const sendMessage = () => {
    if (!selfProfile || !params.peer.id || !text) return;

    const privateMessage: PrivateMessageProps = {
      from: selfProfile,
      to: params.peer,
      text,
      knownChatId: chatId,
    };
    safeSocket()?.emit('private_message', privateMessage);
    setText('');
  };

  return (
    <ScreenLayout
      headerContent={<FormattedMessage defaultMessage="Чат с поддержкой" />}
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
          <KeyboardAvoidWrapper style={styles.content} includeSafeBottom={true}>
            {!!messages?.length && selfProfile && (
              <FlatList
                contentContainerStyle={styles.scrollContent}
                data={messages}
                renderItem={({ item }) => (
                  <Message
                    from={item.from}
                    text={item.text}
                    createdAt={item.createdAt}
                    selfId={selfProfile!.id}
                  />
                )}
                keyExtractor={(item) => item.id}
                inverted
              />
            )}
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
  content: {
    flex: 1,
  },
  scrollContent: {
    gap: SPACING.MINI,
    paddingVertical: SPACING.MINI,
    paddingHorizontal: SPACING.DEFAULT,
  },
  inputBlock: {
    paddingVertical: SPACING.MINI_S,
    paddingHorizontal: SPACING.DEFAULT,
    backgroundColor: lightTheme.main,
  },
});
