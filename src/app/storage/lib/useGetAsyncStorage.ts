import { useQuery } from '@tanstack/react-query';
import { getAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import {
  ASYNC_STORAGE_GET,
  AsyncStorageKeys,
} from 'app/storage/model/types.ts';

export const useGetAsyncStorage = <T>(key: AsyncStorageKeys) => {
  return useQuery<T | null>({
    queryKey: [ASYNC_STORAGE_GET, key],
    queryFn: () => getAsyncStorageValue<T>(key),
    initialData: null,
  });
};
