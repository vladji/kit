import { ReactNode, useCallback, useEffect } from 'react';
import {
  getBaseOs,
  getDeviceId,
  getManufacturer,
  getUniqueId,
} from 'react-native-device-info';
import { getStoreValue, setStoreValue } from 'app/store/lib/asyncStore.ts';
import { StoreKeys } from 'app/store/model/types.ts';
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
      const storeUniqueId = await getStoreValue<string>(StoreKeys.UniqueId);
      console.log('storeUniqueId', storeUniqueId);

      if (!storeUniqueId) {
        const uniqueId = await getUniqueId();
        let response = await getUserByUniqueId({ uniqueId });
        console.log('response-get', response);

        if (!response.user) {
          response = await createUser(uniqueId);
          console.log('response-create', response);
        }

        if (response.user?.uniqueId) {
          await setStoreValue(StoreKeys.UniqueId, response.user.uniqueId);
        }
      }
    };

    authUser();
  }, [getUserByUniqueId, createUser]);

  return children;
};
