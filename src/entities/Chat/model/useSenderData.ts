import { REACT_CHAT_ROOT_ADMIN } from '@env';
import { useAppContext } from 'app/context/useAppContext.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useSenderData = () => {
  const { rootAdmin, userAuthProfile } = useAppContext();
  const { data: uniqueId, isFetching } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UniqueId,
  );

  //TODO: implement authId (userAuthProfile)
  console.log('userAuthProfile', userAuthProfile);

  return {
    rootAdmin,
    rootAdminId: REACT_CHAT_ROOT_ADMIN,
    uniqueId,
    loading: isFetching,
  };
};
