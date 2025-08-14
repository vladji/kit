import { Dispatch, SetStateAction, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import { MESSAGES_LIMIT } from 'entities/chat/model/constants.ts';
import { ChatMessageProps } from 'entities/chat/model/types.ts';

interface Props extends GetMessagesRequest {
  setMessages: Dispatch<SetStateAction<ChatMessageProps[]>>;
}

export const useGetMessages = ({ chatId, setMessages }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, chatId],
    queryFn: () => getMessages({ chatId, page: 1, limit: MESSAGES_LIMIT }),
    enabled: !!chatId,
  });

  useEffect(() => {
    if (data?.messages.length) {
      setMessages(data.messages);
    }
  }, [data, setMessages]);

  return {
    fetchedMessages: data,
    loading: isLoading,
  };
};
