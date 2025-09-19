import {
  TransitionStartFunction,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useFetchLatestMessages } from 'entities/chat/api/useFetchLatestMessages.ts';
import { MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';

interface Props {
  chatId: string | null;
  startTransitionMessages: TransitionStartFunction;
}

export const useMessages = ({ chatId, startTransitionMessages }: Props) => {
  const chatsMetaData = usePersistentStore((store) => store.chatsMetaData);
  const chatHistory = chatId ? chatsMetaData[chatId]?.chatHistory || [] : [];

  const { latestMessages } = useFetchLatestMessages({ chatId });

  const [messages, setMessages] = useState<MessagesListProps[]>(chatHistory);

  const formatList = useFormatListMessages();

  useEffect(() => {
    if (!chatHistory.length && latestMessages?.length) {
      const list = formatList(latestMessages);
      startTransitionMessages(() => {
        setMessages(list);
      });
    }
  }, [chatHistory.length, latestMessages, formatList, startTransitionMessages]);

  return {
    messages,
    setMessages,
  };
};
