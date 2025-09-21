import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  startTransition,
  useEffect,
  useState,
} from 'react';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import {
  ChatMemberProps,
  MarkedAsReadNotifySocketProps,
  MessageProps,
} from 'entities/chat/model/types.ts';

interface Props {
  chatId: string | null;
  setChatId: Dispatch<SetStateAction<string | null>>;
  messages: MessageProps[];
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  startTransitionMessages: TransitionStartFunction;
  navigateToBottom: (message: MessageProps) => void;
  selfProfile: ChatMemberProps | null;
}

export const useSocketListeners = ({
  chatId,
  setChatId,
  messages,
  setMessages,
  startTransitionMessages,
  navigateToBottom,
  selfProfile,
}: Props) => {
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
    safeSocket()?.on('private_message', (msg: MessageProps) => {
      if (!chatId) {
        startTransition(() => setChatId(msg.chatId));
      }
      if (msg.chatId === chatId) {
        if (msg.from === selfProfile?.id) {
          navigateToBottom(msg);
        }
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId, setChatId, setMessages, selfProfile, navigateToBottom]);

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
            startTransitionMessages(() => {
              setMessages((prev) => [...prev]);
            });
          });
        }
      },
    );

    return () => {
      safeSocket()?.off('marked_as_read_notify');
    };
  }, [chatId, messages, messagesIds, setMessages, startTransitionMessages]);
};
