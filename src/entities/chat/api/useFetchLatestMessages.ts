import { useQuery } from '@tanstack/react-query';
import { FLASH_STALE_TIME, QUERY_KEYS } from 'app/api/constants.ts';
import { getMessages } from 'entities/chat/api/requests.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';

interface Props {
  chatId: string | null;
}

export const useFetchLatestMessages = ({ chatId }: Props) => {
  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_LATEST_MESSAGES, chatId],
    queryFn: () =>
      getMessages({
        chatId,
        limit: MESSAGES_DEFAULT_LIMIT * 1.5,
        messageId: null,
        readerId: null,
        direction: null,
      }),
    enabled: !!chatId,
    staleTime: FLASH_STALE_TIME,
  });

  return {
    latestMessages: data,
    refetch,
  };
};
