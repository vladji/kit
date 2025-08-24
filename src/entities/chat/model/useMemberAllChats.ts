import { useRefreshOnFocus } from 'app/providers/QueryProvider/lib/useRefreshOnFocus.ts';
import { useFetchMemberChats } from 'entities/chat/api/useFetchMemberChats.ts';
import { useCurrentUser } from 'entities/user/model/useCurrentUser.ts';

export const useMemberAllChats = (support?: boolean) => {
  const { userId } = useCurrentUser();

  const { data, isLoading, refetch } = useFetchMemberChats({
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
