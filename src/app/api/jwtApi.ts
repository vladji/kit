import { Alert } from 'react-native';
import { REACT_API_KEY } from '@env';
import axios from 'axios';
import { API_URL, STATUS } from 'app/api/constants.ts';
import { fillQueue, processQueue } from 'app/api/model/errorsQueue.ts';
import { CustomAxiosRequestConfig } from 'app/api/types.ts';
import { getAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { refreshToken } from 'shared/lib/auth/refreshToken.ts';

const jwtApi = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': REACT_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

jwtApi.interceptors.request.use(async (config) => {
  const accessToken = await getAsyncStorageValue<string>(
    AsyncStorageKeys.Token,
  );

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;

jwtApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response.status === STATUS.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        await fillQueue(originalRequest, jwtApi);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshTokenResponse = await refreshToken();

        if (refreshTokenResponse.data.success) {
          const accessToken = refreshTokenResponse.data.accessToken;
          processQueue(null, accessToken);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          return jwtApi(originalRequest);
        }

        return Promise.reject(error);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message || error.message || 'Unknown server error';
    Alert.alert('JWT-API Error', message);

    return Promise.reject(error);
  },
);
