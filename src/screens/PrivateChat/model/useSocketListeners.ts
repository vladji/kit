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
import { useSetNewLocalMessage } from 'entities/chat/model/useSetNewLocalMessage.ts';

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
        startTransition(() => {
          setMessagesIds(new Set(messagesIds));
        });
      });
    }
  }, [messages, startTransition]);

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (!chatId) {
        startTransition(() => setChatId(msg.chatId));
      }
      if (msg.chatId === chatId) {
        setNewLocalMessage(msg);
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId, setChatId, setNewLocalMessage, startTransition]);

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
