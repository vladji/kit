import {
  RefObject,
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import { ChatDateProps, MessageProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';
import { getDate } from 'shared/lib/dates.ts';

interface Props {
  chatId: string | null;
  metaRef: RefObject<MetaRefProps>;
  messagesAround?: MessageProps[];
}

export const useMessages = ({ chatId, metaRef, messagesAround }: Props) => {
  const locale = usePersistentStore((store) => store.locale);
  const formatList = useFormatListMessages();
  const chatsMetaData = usePersistentStore((store) => store.chatsMetaData);
  const chatHistory = chatId ? chatsMetaData[chatId]?.chatHistory || [] : [];

  const [messages, setMessages] = useState<MessageProps[]>(chatHistory);

  useEffect(() => {
    if (!chatHistory.length && messagesAround?.length) {
      startTransition(() => {
        setMessages(messagesAround);
      });
    }
  }, [chatHistory.length, messagesAround]);

  const formattedMessages = useMemo(() => {
    if (messages?.length) {
      metaRef.current.loadStartId = null;
      metaRef.current.loadEndId = null;
      const formattedMessages = formatList(messages);

      const shouldSetStartChatDate =
        metaRef.current.shouldSetStartChatDate ||
        (messagesAround && messagesAround?.length < MESSAGES_DEFAULT_LIMIT);
      const firstItemIsMessage = formattedMessages[0].type !== 'date';

      if (shouldSetStartChatDate && firstItemIsMessage) {
        metaRef.current.shouldSetStartChatDate = false;
        const firstMessage = formattedMessages[0].createdAt;
        const startChatDate = getDate(locale, firstMessage);
        const chatDate: ChatDateProps = {
          id: startChatDate,
          type: 'date',
          date: startChatDate,
        };
        return [chatDate, ...formattedMessages];
      }

      return formattedMessages;
    }
    metaRef.current.loadStartId = null;
    metaRef.current.loadEndId = null;
    return [];
  }, [messages, formatList, metaRef, locale, messagesAround]);

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
