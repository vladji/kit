import { queryClient } from 'app/providers/TanStackQuery';
import {
  ASYNC_STORAGE_GET,
  AsyncStorageKeys,
} from 'app/storage/model/types.ts';

export const invalidateUser = async () => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: [ASYNC_STORAGE_GET, AsyncStorageKeys.UserId],
      exact: true,
    }),
    queryClient.invalidateQueries({
      queryKey: [ASYNC_STORAGE_GET, AsyncStorageKeys.Token],
      exact: true,
    }),
    queryClient.invalidateQueries({
      queryKey: [ASYNC_STORAGE_GET, AsyncStorageKeys.RefreshToken],
      exact: true,
    }),
  ]);
};
