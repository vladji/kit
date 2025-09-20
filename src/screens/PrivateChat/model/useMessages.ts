import {
  TransitionStartFunction,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useFetchLatestMessages } from 'entities/chat/api/useFetchLatestMessages.ts';
import { MessageProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';

interface Props {
  chatId: string | null;
  startTransitionMessages: TransitionStartFunction;
}

export const useMessages = ({ chatId, startTransitionMessages }: Props) => {
  const formatList = useFormatListMessages();
  const chatsMetaData = usePersistentStore((store) => store.chatsMetaData);
  const chatHistory = chatId ? chatsMetaData[chatId]?.chatHistory || [] : [];

  const { latestMessages } = useFetchLatestMessages({ chatId });

  const [messages, setMessages] = useState<MessageProps[]>(chatHistory);

  useEffect(() => {
    if (!chatHistory.length && latestMessages?.length) {
      startTransitionMessages(() => {
        setMessages(latestMessages);
      });
    }
  }, [chatHistory.length, latestMessages, startTransitionMessages]);

  const formattedMessages = useMemo(() => {
    if (messages?.length) {
      return formatList(messages);
    }
  }, [messages, formatList]);

  const deferredMessages = useDeferredValue(
    formattedMessages,
    chatHistory.length ? formatList(chatHistory) : [],
  );

  return {
    deferredMessages,
    messages,
    setMessages,
  };
};
