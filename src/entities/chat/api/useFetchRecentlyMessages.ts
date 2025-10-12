import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getRecentlyMessages } from 'entities/chat/api/requests.ts';

interface Props {
  chatId: string | null;
  readerId: string | null;
}

export const useFetchRecentlyMessages = ({ chatId, readerId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_RECENTLY_MESSAGES, chatId, readerId],
    queryFn: () =>
      getRecentlyMessages({
        chatId,
        readerId,
        messageId: null,
        direction: null,
      }),
    enabled: !!chatId && !!readerId,
  });

  return {
    recentlyMessages: data?.messagesAround,
    loading: isLoading,
  };
};
