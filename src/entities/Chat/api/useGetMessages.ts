import { Dispatch, SetStateAction, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessages } from 'entities/Chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/Chat/api/types.ts';
import { ChatMessageProps } from 'entities/Chat/model/types.ts';

interface Props extends GetMessagesRequest {
  setMessages: Dispatch<SetStateAction<ChatMessageProps[]>>;
}

export const useGetMessages = ({ chatId, setMessages }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, chatId],
    queryFn: () => getMessages({ chatId }),
    enabled: !!chatId,
  });

  useEffect(() => {
    if (data?.length) {
      setMessages(data);
    }
  }, [data, setMessages]);

  return {
    fetchedMessages: data,
    loading: isLoading,
  };
};
