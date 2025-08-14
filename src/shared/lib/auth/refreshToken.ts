import { REACT_API_KEY } from '@env';
import axios, { AxiosError } from 'axios';
import { API_URL, STATUS } from 'app/api/constants.ts';
import { AxiosApiResponse } from 'app/api/types.ts';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { REFRESH_TOKEN_URL } from 'shared/lib/auth/constants.ts';
import { logout } from 'shared/lib/auth/logout.ts';

export const refreshToken = async (): Promise<
  AxiosApiResponse<{
    accessToken: string;
  }>
> => {
  try {
    const refreshToken = usePersistentStore.getState().refreshToken;

    const response = await axios.post(
      `${API_URL}${REFRESH_TOKEN_URL}`,
      {},
      {
        headers: {
          'x-api-key': REACT_API_KEY,
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (response.data.success) {
      usePersistentStore.setState({ token: response.data.accessToken });
    }

    if (response.status === STATUS.UNAUTHORIZED) {
      await logout();
      const message = response?.data?.message || 'Refresh token error';
      return Promise.reject(message);
    }

    return response;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message = error.response?.data?.message || error.message || error;
    console.warn('🔒 Refresh token failed for socket:', message);
    await logout();
    return Promise.reject(error);
  }
};
