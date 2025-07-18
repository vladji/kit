import { ReactNode, useCallback, useEffect } from 'react';
import {
  getBaseOs,
  getDeviceId,
  getManufacturer,
  getUniqueId,
} from 'react-native-device-info';
import {
  getAsyncStorageValue,
  setAsyncStorageValue,
} from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { useGetUserByUniqueId } from 'entities/user/api/useGetUserByUniqueId.ts';
import { usePostCreateUser } from 'entities/user/api/usePostCreateUser.ts';
import { UserProps } from 'entities/user/model/types.ts';
import { useAuth } from 'entities/user/model/useAuth.ts';

export const UserInitialize = ({ children }: { children: ReactNode }) => {
  useAuth();

  const { getUserByUniqueId } = useGetUserByUniqueId();
  const { postCreateUser } = usePostCreateUser();

  const createUser = useCallback(
    async (uniqueId: string) => {
      const deviceManufacturer = (await getManufacturer()) || '';
      const deviceOs = (await getBaseOs()) || '';
      const deviceId = getDeviceId() || '';

      const data: UserProps = {
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
    const authUser = async () => {
      const uniqueIdStorage = await getAsyncStorageValue<string>(
        AsyncStorageKeys.UniqueId,
      );

      if (!uniqueIdStorage) {
        const uniqueId = await getUniqueId();
        let response = await getUserByUniqueId({ uniqueId });

        if (!response.user) {
          response = await createUser(uniqueId);
        }

        if (response.user?.uniqueId) {
          await setAsyncStorageValue(
            AsyncStorageKeys.UniqueId,
            response.user.uniqueId,
          );
        }
      }
    };

    authUser();
  }, [getUserByUniqueId, createUser]);

  return children;
};
