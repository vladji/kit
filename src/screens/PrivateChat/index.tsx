import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { getSocket } from 'app/providers/Socket/socket.ts';
import { ChatRouteParams } from 'app/router/RootRouter/types.ts';
import { useGetMessages } from 'entities/Chat/api/useGetMessages.ts';
import { ChatMessageProps } from 'entities/Chat/model/types.ts';
import { useChatUser } from 'entities/Chat/model/useChatUser.ts';
import { LIGHT_COLOR } from 'shared/styles/constants/colors.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';
import { TextInputAction } from 'shared/ui/TextInputAction';
import { Typography } from 'shared/ui/Typography';

export const PrivateChatScreen = () => {
  const {
    params: { to, chatId = null },
  } = useRoute<RouteProp<{ params: ChatRouteParams }>>();

  const { userId } = useChatUser();

  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [text, setText] = useState('');

  const { loading } = useGetMessages({
    chatId,
    setMessages,
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('private_message', (msg) => {
      if (msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off('private_message');
    };
  }, [chatId]);

  const sendMessage = () => {
    const socket = getSocket();
    socket.emit('private_message', {
      from: userId,
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
      <View style={styles.wrapper}>
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
      </View>
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
