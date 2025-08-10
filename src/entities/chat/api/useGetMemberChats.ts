import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMemberChats } from 'entities/chat/api/requests.ts';
import { GetMemberChatsRequest } from 'entities/chat/api/types.ts';

export const useGetMemberChats = ({
  memberId,
  support = false,
}: GetMemberChatsRequest) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_CHATS, memberId, support],
    queryFn: () => getMemberChats({ memberId, support, page: 1, limit: 10 }),
    enabled: !!memberId,
    refetchOnWindowFocus: true,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
