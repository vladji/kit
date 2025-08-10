import { useEffect } from 'react';
import { connectSocket } from 'app/providers/Socket/socket.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useSocketConnect = () => {
  const { data: token, isFetched: tokenFetched } = useGetAsyncStorage<string>(
    AsyncStorageKeys.Token,
  );
  const { data: userId, isFetched: userIdFetched } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UserId,
  );

  const fetched = tokenFetched && userIdFetched;

  useEffect(() => {
    if (userId && fetched) {
      connectSocket(userId, token);
    }
  }, [token, userId, fetched]);
};
