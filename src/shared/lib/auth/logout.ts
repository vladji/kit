import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { invalidateUser } from 'shared/lib/auth/invalidateUser.ts';

export const logout = async () => {
  await Promise.all([
    setAsyncStorageValue(AsyncStorageKeys.UserDbId, null),
    setAsyncStorageValue(AsyncStorageKeys.Token, null),
    setAsyncStorageValue(AsyncStorageKeys.RefreshToken, null),
  ]);

  await invalidateUser();
};
