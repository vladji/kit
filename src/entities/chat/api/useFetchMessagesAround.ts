import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessagesAround } from 'entities/chat/api/requests.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';

interface Props {
  chatId: string | null;
  readerId: string | null;
}

export const useGetMessagesAround = ({ chatId, readerId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_MESSAGES_AROUND, chatId, readerId],
    queryFn: () =>
      getMessagesAround({
        chatId,
        readerId,
        limit: MESSAGES_DEFAULT_LIMIT,
        messageId: null,
        direction: null,
      }),
    enabled: !!chatId && !!readerId,
  });

  return {
    messagesAround: data?.messagesAround,
    loading: isLoading,
  };
};
