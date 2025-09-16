import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
} from 'react';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { MessagesListProps } from 'entities/chat/model/types.ts';
import { useSetLocalMessage } from 'entities/chat/model/useSetLocalMessage.tsx';

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
  const setLocalMessage = useSetLocalMessage({
    messagesState: messages,
    setMessages,
  });

  useEffect(() => {
    safeSocket()?.on('private_message', (msg) => {
      if (!chatId) {
        startTransition(() => setChatId(msg.chatId));
      }
      if (msg.chatId === chatId) {
        setLocalMessage(msg);
      }
    });

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [chatId, setChatId, setLocalMessage, startTransition]);
};
