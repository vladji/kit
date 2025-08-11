import { getUniqueId } from 'react-native-device-info';
import { queryClient } from 'app/providers/QueryProvider';
import { createUser } from 'app/providers/UserInitialize/lib/createUser.ts';
import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import {
  ASYNC_STORAGE_GET,
  AsyncStorageKeys,
} from 'app/storage/model/types.ts';
import { getUserByUniqueId } from 'entities/user/api/requests.ts';

export const checkUserUniqueId = async () => {
  const uniqueId = await getUniqueId();
  let user = await getUserByUniqueId(uniqueId);

  if (!user) {
    user = await createUser(uniqueId);
  }

  if (user?.id) {
    await setAsyncStorageValue(AsyncStorageKeys.UserId, user.id);
    await queryClient.invalidateQueries({
      queryKey: [ASYNC_STORAGE_GET, AsyncStorageKeys.UserId],
      exact: true,
    });
  }

  return user;
};
