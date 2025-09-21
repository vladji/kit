import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessages } from 'entities/chat/api/requests.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';

interface Props {
  chatId: string | null;
}

export const useFetchLatestMessages = ({ chatId }: Props) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_LATEST_MESSAGES, chatId],
    queryFn: () =>
      getMessages({
        chatId,
        limit: Math.round(MESSAGES_DEFAULT_LIMIT),
        messageId: null,
        readerId: null,
        direction: null,
      }),
    enabled: !!chatId,
  });

  return {
    latestMessages: data,
  };
};
