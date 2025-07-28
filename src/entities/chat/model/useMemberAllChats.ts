import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { useGetMemberChats } from 'entities/chat/api/useGetMemberChats.ts';

export const useMemberAllChats = (support?: boolean) => {
  const { data: userId, isLoading: userIdLoading } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UserId,
  );

  const {
    chats,
    isLoading: chatsLoading,
    refetch,
  } = useGetMemberChats({ memberId: userId, support });

  return {
    loading: userIdLoading || chatsLoading,
    refetch,
    chats,
  };
};
