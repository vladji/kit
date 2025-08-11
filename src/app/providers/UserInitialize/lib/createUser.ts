import {
  getBaseOs,
  getDeviceId,
  getManufacturer,
} from 'react-native-device-info';
import { ApiResponse } from 'app/api/types.ts';
import { postCreateUser } from 'entities/user/api/requests.ts';
import { CreateUserDocument } from 'entities/user/api/types.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const createUser = async (
  uniqueId: string,
): Promise<ApiResponse<UserProps>> => {
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
};
