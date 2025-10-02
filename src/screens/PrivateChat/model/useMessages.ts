import {
  RefObject,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FlashListRef } from '@shopify/flash-list';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  chatId: string | null;
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
  metaRef: RefObject<MetaRefProps>;
  recentlyMessages?: MessageProps[];
}

export const useMessages = ({
  chatId,
  listRef,
  metaRef,
  recentlyMessages,
}: Props) => {
  const formatList = useFormatListMessages();
  const chatsMetaData = usePersistentStore((store) => store.chatsMetaData);
  const chatHistory = chatId ? chatsMetaData[chatId]?.chatHistory || [] : [];

  const [messages, setMessages] = useState<MessageProps[]>(chatHistory);

  useEffect(() => {
    if (!chatHistory.length && recentlyMessages?.length) {
      setMessages(recentlyMessages);

      // metaRef.current.shouldScrollToBottom = true - protection for guaranteed scrolling
      metaRef.current.shouldScrollToBottom = true;
      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd({ animated: true });
      });
    }
  }, [chatHistory.length, recentlyMessages, listRef, metaRef]);

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
