import { AxiosInstance } from 'axios';
import { CustomAxiosRequestConfig } from 'app/api/types.ts';

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

export const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

export const fillQueue = (
  originalRequest: CustomAxiosRequestConfig,
  jwtApi: AxiosInstance,
) => {
  return new Promise((resolve, reject) => {
    failedQueue.push({
      resolve: (token: string) => {
        originalRequest._retry = true;
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${token}`,
        };
        resolve(jwtApi(originalRequest));
      },
      reject: (err) => {
        reject(err);
      },
    });
  });
};
