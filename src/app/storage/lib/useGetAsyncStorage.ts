import { useQuery } from '@tanstack/react-query';
import { getAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useGetAsyncStorage = <T>(key: AsyncStorageKeys) => {
  return useQuery<T | null>({
    queryKey: ['AsyncStorageGet', key],
    queryFn: () => getAsyncStorageValue<T>(key),
    initialData: null,
  });
};
