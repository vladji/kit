import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getAllChats } from 'entities/Chat/api/requests.ts';
import { GetAppChatsRequest } from 'entities/Chat/api/types.ts';

export const useGetAllChats = ({ member }: GetAppChatsRequest) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CHATS, member],
    queryFn: () => getAllChats({ member }),
    enabled: !!member,
    refetchOnWindowFocus: true,
  });

  return {
    allChats: data,
    loading: isLoading,
    refetch,
  };
};
