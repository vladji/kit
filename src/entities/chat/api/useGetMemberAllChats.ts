import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMemberAllChats } from 'entities/chat/api/requests.ts';
import { GetMemberChatsRequest } from 'entities/chat/api/types.ts';

export const useGetMemberAllChats = ({ member }: GetMemberChatsRequest) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_ALL_CHATS, member],
    queryFn: () => getMemberAllChats({ member, page: 1, limit: 10 }),
    enabled: !!member,
    refetchOnWindowFocus: true,
  });

  return {
    chats: data,
    isLoading,
    refetch,
  };
};
