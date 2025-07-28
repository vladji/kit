import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { ChatRouteParams } from 'app/router/RootRouter/types.ts';
import { useGetMessages } from 'entities/chat/api/useGetMessages.ts';
import {
  ChatMessageProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useFrom } from 'screens/PrivateChat/model/useFrom.ts';
import { Message } from 'screens/PrivateChat/ui/Message.tsx';
import { LIGHT_COLOR } from 'shared/styles/constants/colors.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { KeyboardAvoidWrapper } from 'shared/ui/KeyboardAvoid/KeyboardAvoidWrapper.tsx';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';
import { TextInputAction } from 'shared/ui/TextInputAction';

export const PrivateChatScreen = () => {
  const from = useFrom();
  const { params } = useRoute<RouteProp<{ params: ChatRouteParams }>>();

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
    if (!from) return;

    const privateMessage: PrivateMessageProps = {
      from,
      to: params.to,
      text,
    };
    safeSocket()?.emit('private_message', privateMessage);
    setText('');
  };

  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Чат с поддержкой" />}
      hasBackButton
    >
      {!from && <Spinner />}
      {!!from && (
        <KeyboardAvoidWrapper
          style={styles.wrapper}
          correction={6}
          includeSafeBottom={true}
        >
          <View style={styles.messagesBlock}>
            {loading && <Spinner />}
            {!!messages?.length && (
              <FlatList
                data={messages}
                renderItem={(item) => <Message data={item} ownerId={from.id} />}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
          <TextInputAction
            inputValue={text}
            onChangeText={setText}
            onPress={sendMessage}
            Icon={<Send color={LIGHT_COLOR} />}
          />
        </KeyboardAvoidWrapper>
      )}
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
