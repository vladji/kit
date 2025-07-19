import { useCallback, useEffect } from 'react';
import {
  getBaseOs,
  getDeviceId,
  getManufacturer,
  getUniqueId,
} from 'react-native-device-info';
import { CreateUserDocument } from 'app/providers/UserInitialize/api/types.ts';
import { useGetUserByUniqueId } from 'app/providers/UserInitialize/api/useGetUserByUniqueId.ts';
import { usePostCreateUser } from 'app/providers/UserInitialize/api/usePostCreateUser.ts';
import {
  getAsyncStorageValue,
  setAsyncStorageValue,
} from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useIdentifyUser = () => {
  const { getUserByUniqueId } = useGetUserByUniqueId();
  const { postCreateUser } = usePostCreateUser();

  const createUser = useCallback(
    async (uniqueId: string) => {
      const deviceManufacturer = (await getManufacturer()) || '';
      const deviceOs = (await getBaseOs()) || '';
      const deviceId = getDeviceId() || '';

      const data: CreateUserDocument = {
        type: 'client',
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
      const userDbIdStorage = await getAsyncStorageValue<string>(
        AsyncStorageKeys.UserDbId,
      );

      if (!userDbIdStorage) {
        const uniqueId = await getUniqueId();
        let response = await getUserByUniqueId({ uniqueId });

        if (!response.user) {
          response = await createUser(uniqueId);
        }

        if (response.user?.id) {
          await setAsyncStorageValue(
            AsyncStorageKeys.UserDbId,
            response.user.id,
          );
        }
      }
    };

    checkUniqueId();
  }, [getUserByUniqueId, createUser]);
};
