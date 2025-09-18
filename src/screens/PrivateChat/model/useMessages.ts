import { useDeferredValue, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useGetLatestMessages } from 'entities/chat/api/useGetLatestMessages.ts';
import { MessagesListProps } from 'entities/chat/model/types.ts';

interface Props {
  chatId: string | null;
}

export const useMessages = ({ chatId }: Props) => {
  const [chatsMetaData, setChatHistory] = usePersistentStore(
    useShallow((store) => [store.chatsMetaData, store.setChatHistory]),
  );
  const chatHistory = chatId ? chatsMetaData[chatId]?.chatHistory || [] : [];

  const [messages, setMessages] = useState<MessagesListProps[]>(chatHistory);

  const { mutate: getLatestMessages, data: latestMessages } =
    useGetLatestMessages({ setMessages });

  useEffect(() => {
    if (!messages.length && !latestMessages?.length) {
      getLatestMessages({ chatId });
    }
  }, [messages, chatId, getLatestMessages, latestMessages]);

  const deferredMessages = useDeferredValue(messages);

  return {
    deferredMessages,
    messages,
    setMessages,
    setChatHistory,
  };
};
