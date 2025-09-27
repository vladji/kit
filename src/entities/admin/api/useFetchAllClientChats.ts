import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getAllClientChats } from 'entities/admin/api/requests.ts';
import { CHATS_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';

export const useFetchAllClientChats = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      QUERY_KEYS.FETCH_CHATS,
      QUERY_KEYS.FETCH_SUPPORT_ALL_CLIENT_CHATS,
    ],
    queryFn: () => getAllClientChats({ page: 1, limit: CHATS_DEFAULT_LIMIT }),
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
