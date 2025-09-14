import { Dispatch, SetStateAction, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessagesAround } from 'entities/chat/api/requests.ts';
import { MessagesAroundResponse } from 'entities/chat/api/types.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import { MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.tsx';

interface Props {
  chatId: string | null;
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
}

export const useGetMessagesAround = ({ chatId, setMessages }: Props) => {
  const formatList = useFormatListMessages();

  const select = useCallback(
    (response: MessagesAroundResponse) => {
      if (!response.messagesAround) {
        return {
          firstUnreadMessageId: null,
        };
      }

      const messagesAround = formatList(response.messagesAround);
      setMessages(messagesAround);

      return {
        firstUnreadMessageId: response.firstUnreadMessageId,
      };
    },
    [formatList, setMessages],
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES_AROUND, chatId],
    queryFn: () =>
      getMessagesAround({
        chatId,
        limit: MESSAGES_DEFAULT_LIMIT,
        messageId: null,
        direction: null,
      }),
    select,
    enabled: !!chatId,
  });

  return {
    data,
    loading: isLoading,
  };
};
