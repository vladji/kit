import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  getBaseOs,
  getDeviceId,
  getManufacturer,
  getUniqueId,
} from 'react-native-device-info';
import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import {
  ASYNC_STORAGE_GET,
  AsyncStorageKeys,
} from 'app/storage/model/types.ts';
import { CreateUserDocument } from 'entities/user/api/types.ts';
import { useGetUserByUniqueId } from 'entities/user/api/useGetUserByUniqueId.ts';
import { usePostCreateUser } from 'entities/user/api/usePostCreateUser.ts';

export const useCheckUser = () => {
  const queryClient = useQueryClient();

  const { getUserByUniqueId } = useGetUserByUniqueId();
  const { postCreateUser } = usePostCreateUser();

  const createUser = useCallback(
    async (uniqueId: string) => {
      const deviceManufacturer = (await getManufacturer()) || '';
      const deviceOs = (await getBaseOs()) || '';
      const deviceId = getDeviceId() || '';

      const data: CreateUserDocument = {
        uniqueId,
        deviceData: {
          deviceManufacturer,
          deviceOs,
          deviceId,
        },
      };

      return await postCreateUser(data);
    },
    [postCreateUser],
  );

  return useCallback(async () => {
    const uniqueId = await getUniqueId();
    let user = await getUserByUniqueId({ uniqueId });

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
  }, [createUser, getUserByUniqueId, queryClient]);
};
