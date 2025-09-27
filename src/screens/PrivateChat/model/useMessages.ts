import {
  RefObject,
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { MessageProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  chatId: string | null;
  metaRef: RefObject<MetaRefProps>;
  recentlyMessages?: MessageProps[];
}

export const useMessages = ({ chatId, metaRef, recentlyMessages }: Props) => {
  const formatList = useFormatListMessages();
  const chatsMetaData = usePersistentStore((store) => store.chatsMetaData);
  const chatHistory = chatId ? chatsMetaData[chatId]?.chatHistory || [] : [];

  const [messages, setMessages] = useState<MessageProps[]>(chatHistory);

  useEffect(() => {
    if (!chatHistory.length && recentlyMessages?.length) {
      startTransition(() => {
        setMessages(recentlyMessages);
      });
      metaRef.current.shouldScrollToBottom = true;
    }
  }, [chatHistory.length, recentlyMessages, metaRef]);

  const formattedMessages = useMemo(() => {
    if (messages?.length) {
      metaRef.current.loadStartId = null;
      metaRef.current.loadEndId = null;
      return formatList(messages);
    }
    metaRef.current.loadStartId = null;
    metaRef.current.loadEndId = null;
    return [];
  }, [messages, formatList, metaRef]);

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
