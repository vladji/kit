import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
        setMessages((prev) => [...prev, msg]);
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
        <KeyboardAvoidWrapper
          style={styles.wrapper}
          correction={6}
          includeSafeBottom={true}
        >
          <View style={styles.messagesBlock}>
            {!!messages?.length && (
              <FlatList
                data={messages}
                renderItem={(item) => (
                  <Message data={item} ownerId={selfProfile.id} />
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
          <TextInputAction
            inputValue={text}
            onChangeText={setText}
            onPress={sendMessage}
            Icon={<Send color={lightTheme.main} />}
          />
        </KeyboardAvoidWrapper>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: SPACING.BIG,
  },
  messagesBlock: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
});
