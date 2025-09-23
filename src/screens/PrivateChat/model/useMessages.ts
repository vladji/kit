import {
  RefObject,
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FlashListRef } from '@shopify/flash-list';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useGetMessagesAround } from 'entities/chat/api/useFetchMessagesAround.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import {
  ChatDateProps,
  ChatMemberProps,
  MessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';
import { getDate } from 'shared/lib/dates.ts';

interface Props {
  chatId: string | null;
  selfProfile: ChatMemberProps | null;
  metaRef: RefObject<MetaRefProps>;
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
}

export const useMessages = ({
  chatId,
  selfProfile,
  metaRef,
  listRef,
}: Props) => {
  const locale = usePersistentStore((store) => store.locale);
  const formatList = useFormatListMessages();
  const chatsMetaData = usePersistentStore((store) => store.chatsMetaData);
  const chatHistory = chatId ? chatsMetaData[chatId]?.chatHistory || [] : [];

  const [messages, setMessages] = useState<MessageProps[]>(chatHistory);

  const { messagesAround } = useGetMessagesAround({
    chatId,
    readerId: selfProfile?.id || null,
  });

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

  useEffect(() => {
    if (metaRef.current.shouldScrollToBottom) {
      setImmediate(() => {
        listRef.current?.scrollToEnd({ animated: true });
        metaRef.current.shouldScrollToBottom = false;
      });
    }
  }, [deferredMessages, metaRef, listRef]);

  return {
    deferredMessages,
    messages,
    setMessages,
  };
};
