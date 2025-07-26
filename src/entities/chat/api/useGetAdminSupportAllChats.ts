import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getAdminSupportAllChats } from 'entities/chat/api/requests.ts';

export const useGetAdminSupportAllChats = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_ADMIN_SUPPORT_ALL_CHATS],
    queryFn: () => getAdminSupportAllChats({ page: 1, limit: 10 }),
    refetchOnWindowFocus: true,
  });

  return {
    chats: data,
    isLoading,
    refetch,
  };
};
