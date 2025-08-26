import { Dispatch, SetStateAction, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessages } from 'entities/chat/api/requests.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.tsx';

interface Props {
  chatId: string | null;
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
}

export const useFetchMessagesLatest = ({ chatId, setMessages }: Props) => {
  const formatList = useFormatListMessages();

  const select = useCallback(
    (messages: MessageProps[]) => {
      const list = formatList(messages);
      setMessages(list);
    },
    [formatList, setMessages],
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, chatId],
    queryFn: () =>
      getMessages({
        chatId,
        messageId: null,
        direction: null,
        limit: MESSAGES_DEFAULT_LIMIT,
      }),
    select,
    enabled: !!chatId,
  });

  return {
    fetchedMessages: data,
    loading: isLoading,
  };
};
