import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getAllClientChats } from 'entities/admin/api/requests.ts';

export const useGetAllClientChats = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_SUPPORT_ALL_CLIENT_CHATS],
    queryFn: () => getAllClientChats({ page: 1, limit: 10 }),
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
