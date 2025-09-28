import {
  Dispatch,
  SetStateAction,
  startTransition,
  useEffect,
  useState,
} from 'react';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import {
  ChatMemberProps,
  MessageProps,
  MessagesUpdatedProps,
  UnreadCountProps,
} from 'entities/chat/model/types.ts';
import { PastLatestMessage } from 'screens/PrivateChat/model/usePastLatestMessage.ts';

interface Props {
  chatId: string | null;
  setChatId: Dispatch<SetStateAction<string | null>>;
  messages: MessageProps[];
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  pastLatestMessage: PastLatestMessage;
  selfProfile: ChatMemberProps | null;
  readerId: string | null;
  unreadData?: UnreadCountProps;
}

export const useSocketListeners = ({
  chatId,
  setChatId,
  messages,
  setMessages,
  pastLatestMessage,
  selfProfile,
  readerId,
  unreadData,
}: Props) => {
  const unreadInitial = readerId && unreadData ? unreadData[readerId] : 0;
  const [unreadCounter, setUnreadCounter] = useState(unreadInitial);
  const [messagesIds, setMessagesIds] = useState<Set<string> | null>(null);

  useEffect(() => {
    if (messages.length) {
      requestAnimationFrame(() => {
        const messagesIds = messages?.map((message) => message.id);
        startTransition(() => {
          setMessagesIds(new Set(messagesIds));
        });
      });
    }
  }, [messages]);

  useEffect(() => {
    safeSocket()?.on('private_message', (message: MessageProps) => {
      if (!chatId) {
        startTransition(() => setChatId(message.chatId));
      }
      if (message.chatId === chatId) {
        const shouldScrollToBottom = message.from === selfProfile?.id;
        pastLatestMessage(message, shouldScrollToBottom);
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId, setChatId, setMessages, selfProfile, pastLatestMessage]);

  useEffect(() => {
    safeSocket()?.on('messages_updated', (data: MessagesUpdatedProps) => {
      if (
        data.chatId === chatId &&
        readerId &&
        data.unreadCount &&
        data.unreadCount[readerId] >= 0
      ) {
        startTransition(() => setUnreadCounter(data.unreadCount![readerId!]));
      }

      if (data.chatId === chatId && !!data.readMessageIds) {
        setTimeout(() => {
          data.readMessageIds?.forEach((id) => {
            if (messagesIds?.has(id)) {
              const message = messages.find((message) => message.id === id);
              if (message) {
                message.read = true;
              }
            }
          });
          startTransition(() => {
            setMessages((prev) => [...prev]);
          });
        });
      }
    });

    return () => {
      safeSocket()?.off('messages_updated');
    };
  }, [chatId, messages, messagesIds, setMessages, readerId]);

  return {
    unreadCounter,
  };
};
