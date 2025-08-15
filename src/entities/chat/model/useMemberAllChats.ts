import { useRefreshOnFocus } from 'app/providers/QueryProvider/lib/useRefreshOnFocus.ts';
import { useGetMemberChats } from 'entities/chat/api/useGetMemberChats.ts';
import { useCurrentUser } from 'entities/user/model/useCurrentUser.ts';

export const useMemberAllChats = (support?: boolean) => {
  const { userId } = useCurrentUser();

  const { data, isLoading, refetch } = useGetMemberChats({
    memberId: userId,
    support,
  });

  useRefreshOnFocus(refetch);

  return {
    loading: isLoading,
    refetch,
    data,
  };
};
