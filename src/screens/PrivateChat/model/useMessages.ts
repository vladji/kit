import {
  TransitionStartFunction,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useGetMessagesAround } from 'entities/chat/api/useFetchMessagesAround.ts';
import { ChatMemberProps, MessageProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';

interface Props {
  chatId: string | null;
  selfProfile: ChatMemberProps | null;
  startTransitionMessages: TransitionStartFunction;
}

export const useMessages = ({
  chatId,
  selfProfile,
  startTransitionMessages,
}: Props) => {
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
      startTransitionMessages(() => {
        setMessages(messagesAround);
      });
    }
  }, [chatHistory.length, messagesAround, startTransitionMessages]);

  const formattedMessages = useMemo(() => {
    if (messages?.length) {
      return formatList(messages);
    }
    return [];
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
