import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useChatUser = (members?: string[]) => {
  const { data: userId, isFetching } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UserDbId,
  );

  //TODO: implement authId (userAuthProfile)
  // const recipient = members?.find((user) => user !== user);

  return {
    userId,
    loading: isFetching,
  };
};
