import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { ChatRouteParams } from 'app/router/RootRouter/types.ts';
import { useGetMessages } from 'entities/Chat/api/useGetMessages.ts';
import { getSocket } from 'entities/Chat/lib/socket.ts';
import { composeChatId } from 'entities/Chat/lib/utils.ts';
import { ChatMessageProps } from 'entities/Chat/model/types.ts';
import { useSenderData } from 'entities/Chat/model/useSenderData.ts';
import { LIGHT_COLOR, TRANSPARENT } from 'shared/styles/constants/colors.ts';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';
import { TextInputComponent } from 'shared/ui/TextInput';
import { Typography } from 'shared/ui/Typography';

export const ChatScreen = () => {
  const { colors } = useStyles();

  const {
    params: { to },
  } = useRoute<RouteProp<{ params: ChatRouteParams }>>();

  const { uniqueId } = useSenderData();
  const chatId = composeChatId({ from: uniqueId, to });

  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [text, setText] = useState('');

  const { loading } = useGetMessages({
    chatId,
    setMessages,
  });

  useEffect(() => {
    const socket = getSocket();
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
      from: uniqueId,
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading && <Spinner />}
          {!!messages &&
            messages.map((message) => (
              <Typography key={message.createdAt.toString()}>
                {message.text}
              </Typography>
            ))}
        </ScrollView>
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
