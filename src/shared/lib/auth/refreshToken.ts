import axios from 'axios';
import { API_URL, STATUS } from 'app/api/constants.ts';
import { AxiosApiResponse } from 'app/api/types.ts';
import {
  getAsyncStorageValue,
  setAsyncStorageValue,
} from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { REFRESH_TOKEN_URL } from 'shared/lib/auth/constants.ts';
import { logout } from 'shared/lib/auth/logout.ts';

export const refreshToken = async (): Promise<
  AxiosApiResponse<{
    accessToken: string;
  }>
> => {
  try {
    const refreshToken = await getAsyncStorageValue<string>(
      AsyncStorageKeys.RefreshToken,
    );

    const response = await axios.post(
      `${API_URL}${REFRESH_TOKEN_URL}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (response.data.success) {
      await setAsyncStorageValue(
        AsyncStorageKeys.Token,
        response.data.accessToken,
      );
    }

    if (response.status === STATUS.UNAUTHORIZED) {
      await logout();
      const message = response?.data?.message || 'Refresh token error';
      return Promise.reject(message);
    }

    return response;
  } catch (error) {
    await logout();
    return Promise.reject(error);
  }
};
