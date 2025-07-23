import { useEffect } from 'react';
import { connectSocket } from 'app/providers/Socket/socket.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useSocketConnect = () => {
  const { data: token, isFetched: tokenFetched } = useGetAsyncStorage<string>(
    AsyncStorageKeys.Token,
  );
  const { data: userDbId, isFetched: userDbIdFetched } =
    useGetAsyncStorage<string>(AsyncStorageKeys.UserDbId);

  const fetched = tokenFetched && userDbIdFetched;

  useEffect(() => {
    if (userDbId && fetched) {
      connectSocket(userDbId, token);
    }
  }, [token, userDbId, fetched]);
};
