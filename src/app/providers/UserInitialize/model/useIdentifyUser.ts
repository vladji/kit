import { useEffect } from 'react';
import { useCheckUser } from 'app/providers/UserInitialize/lib/useCheckUser.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useIdentifyUser = () => {
  const { data: userId, isFetched } = useGetAsyncStorage(
    AsyncStorageKeys.UserId,
  );

  const checkUser = useCheckUser();

  useEffect(() => {
    if (!userId && isFetched) {
      checkUser();
    }
  }, [userId, isFetched, checkUser]);
};
