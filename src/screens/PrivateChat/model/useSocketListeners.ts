import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useState,
} from 'react';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import {
  MarkedAsReadNotifySocketProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { useSetNewLocalMessage } from 'screens/PrivateChat/model/useSetNewLocalMessage.ts';

interface Props {
  chatId: string | null;
  setChatId: Dispatch<SetStateAction<string | null>>;
  messages: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransition: TransitionStartFunction;
}

export const useSocketListeners = ({
  chatId,
  setChatId,
  messages,
  setMessages,
  startTransition,
}: Props) => {
  const [messagesIds, setMessagesIds] = useState<Set<string> | null>(null);
  const setNewLocalMessage = useSetNewLocalMessage({
    messagesState: messages,
    setMessages,
  });

  useEffect(() => {
    if (messages.length) {
      requestAnimationFrame(() => {
        const messagesIds = messages?.map((message) => message.id);
        setMessagesIds(new Set(messagesIds));
      });
    }
  }, [messages]);

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (!chatId) {
        setChatId(msg.chatId);
      }
      if (msg.chatId === chatId) {
        setNewLocalMessage(msg);
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId, setChatId, setNewLocalMessage]);

  useEffect(() => {
    safeSocket()?.on(
      'marked_as_read_notify',
      (msg: MarkedAsReadNotifySocketProps) => {
        if (msg.chatId === chatId) {
          requestAnimationFrame(() => {
            msg.messageIds.forEach((id) => {
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
      },
    );

    return () => {
      safeSocket()?.off('marked_as_read_notify');
    };
  }, [chatId, messages, messagesIds, setMessages, startTransition]);
};
