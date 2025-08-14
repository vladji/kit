import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getAllStoreChats } from 'entities/admin/api/requests.ts';

export const useGetAllStoreChats = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_SUPPORT_ALL_STORE_CHATS],
    queryFn: () => getAllStoreChats({ page: 1, limit: 10 }),
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
