import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  getBaseOs,
  getDeviceId,
  getManufacturer,
  getUniqueId,
} from 'react-native-device-info';
import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import {
  ASYNC_STORAGE_GET,
  AsyncStorageKeys,
} from 'app/storage/model/types.ts';
import { CreateUserDocument } from 'entities/user/api/types.ts';
import { useGetUserByUniqueId } from 'entities/user/api/useGetUserByUniqueId.ts';
import { usePostCreateUser } from 'entities/user/api/usePostCreateUser.ts';

export const useIdentifyUser = () => {
  const queryClient = useQueryClient();

  const { getUserByUniqueId } = useGetUserByUniqueId();
  const { postCreateUser } = usePostCreateUser();

  const { data: userId, isFetched } = useGetAsyncStorage(
    AsyncStorageKeys.UserId,
  );

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

  useEffect(() => {
    const checkUniqueId = async () => {
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
    };

    if (!userId && isFetched) {
      checkUniqueId();
    }
  }, [userId, isFetched, getUserByUniqueId, createUser, queryClient]);
};
