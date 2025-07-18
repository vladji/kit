import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessages } from 'entities/Chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/Chat/api/types.ts';

interface Props extends GetMessagesRequest {
  enabled: boolean;
}

export const useGetMessages = ({ from, to, enabled }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, from, to],
    queryFn: () => getMessages({ from, to }),
    enabled,
  });

  return {
    messages: data,
    loading: isLoading,
  };
};
