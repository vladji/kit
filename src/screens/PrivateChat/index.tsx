import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { getSocket } from 'app/providers/Socket/socket.ts';
import { ChatRouteParams } from 'app/router/RootRouter/types.ts';
import { useGetMessages } from 'entities/Chat/api/useGetMessages.ts';
import { ChatMessageProps } from 'entities/Chat/model/types.ts';
import { useChatUser } from 'entities/Chat/model/useChatUser.ts';
import { LIGHT_COLOR, TRANSPARENT } from 'shared/styles/constants/colors.ts';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';
import { TextInputComponent } from 'shared/ui/TextInput';
import { Typography } from 'shared/ui/Typography';

export const PrivateChatScreen = () => {
  const { colors } = useStyles();

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
        <View style={styles.inputBlock}>
          <TextInputComponent value={text} onChangeText={setText} />
          <TouchableOpacity
            style={[styles.button, colors().brand]}
            onPress={sendMessage}
          >
            <Send color={LIGHT_COLOR} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: Sizes.Big,
  },
  scrollContainer: {
    flex: 1,
  },
  inputBlock: {
    flexDirection: 'row',
    gap: Sizes.Default,
  },
  button: {
    flexDirection: 'row',
    height: '100%',
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: ComponentSize.ButtonBorderRadius,
    borderColor: TRANSPARENT,
  },
});
