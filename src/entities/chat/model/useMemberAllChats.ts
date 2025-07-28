import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { useGetMemberChats } from 'entities/chat/api/useGetMemberChats.ts';

export const useMemberAllChats = () => {
  const { data: userId, isLoading: userDbIdLoading } =
    useGetAsyncStorage<string>(AsyncStorageKeys.UserId);

  const {
    chats,
    isLoading: chatsLoading,
    refetch,
  } = useGetMemberChats({ memberId: userId });

  const supportChat = chats?.find((chat) => chat.support);

  return {
    loading: userDbIdLoading || chatsLoading,
    refetch,
    chats,
    supportChat,
  };
};
