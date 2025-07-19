import { useEffect } from 'react';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { connectSocket } from 'entities/Chat/lib/socket.ts';

export const useSocketConnect = () => {
  const { data: uniqueId } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UniqueId,
  );

  useEffect(() => {
    if (uniqueId) {
      connectSocket(uniqueId);
    }
  }, [uniqueId]);
};
