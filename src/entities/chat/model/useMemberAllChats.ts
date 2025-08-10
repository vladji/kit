import { useRefreshOnFocus } from 'app/providers/QueryProvider/lib/useRefreshOnFocus.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { useGetMemberChats } from 'entities/chat/api/useGetMemberChats.ts';

export const useMemberAllChats = (support?: boolean) => {
  const { data: userId, isLoading: userIdLoading } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UserId,
  );

  const {
    data,
    isLoading: chatsLoading,
    refetch,
  } = useGetMemberChats({ memberId: userId, support });
  useRefreshOnFocus(refetch);

  return {
    loading: userIdLoading || chatsLoading,
    refetch,
    data,
  };
};
