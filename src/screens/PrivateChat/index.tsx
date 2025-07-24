import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { ChatRouteParams } from 'app/router/RootRouter/types.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { useGetMessages } from 'entities/chat/api/useGetMessages.ts';
import { ChatMessageProps } from 'entities/chat/model/types.ts';
import { LIGHT_COLOR } from 'shared/styles/constants/colors.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { KeyboardAvoidWrapper } from 'shared/ui/KeyboardAvoid/KeyboardAvoidWrapper.tsx';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';
import { TextInputAction } from 'shared/ui/TextInputAction';
import { Typography } from 'shared/ui/Typography';

export const PrivateChatScreen = () => {
  const {
    params: { to, chatId = null },
  } = useRoute<RouteProp<{ params: ChatRouteParams }>>();

  const { data: userDbId } = useGetAsyncStorage<string>(AsyncStorageKeys.Token);

  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [text, setText] = useState('');

  const { loading } = useGetMessages({
    chatId,
    setMessages,
  });

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId]);

  const sendMessage = () => {
    safeSocket()?.emit('private_message', {
      from: userDbId,
      to,
      text,
    });
    setText('');
  };

  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Чат с поддержкой" />}
      hasBackButton
    >
      <KeyboardAvoidWrapper
        style={styles.wrapper}
        correction={6}
        includeSafeBottom={true}
      >
        <View style={styles.messagesBlock}>
          {loading && <Spinner />}
          {!!messages?.length && (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {messages.map((message) => (
                <Typography key={message.createdAt.toString()}>
                  {message.text}
                </Typography>
              ))}
            </ScrollView>
          )}
        </View>
        <TextInputAction
          inputValue={text}
          onChangeText={setText}
          onPress={sendMessage}
          Icon={<Send color={LIGHT_COLOR} />}
        />
      </KeyboardAvoidWrapper>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: Sizes.Big,
  },
  messagesBlock: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
});
