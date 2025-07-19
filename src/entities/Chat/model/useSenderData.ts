import { useContext } from 'react';
import { REACT_CHAT_ROOT_ADMIN } from '@env';
import { AppContext } from 'app/context';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useSenderData = () => {
  const { rootAdmin } = useContext(AppContext);
  const { data: uniqueId, isFetching } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UniqueId,
  );

  //TODO: implement authId (userAuthProfile)

  return {
    rootAdmin,
    rootAdminId: REACT_CHAT_ROOT_ADMIN,
    uniqueId,
    loading: isFetching,
  };
};
