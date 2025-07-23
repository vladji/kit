import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface BaseApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export type ApiResponse<T> = BaseApiResponse & T;
export type AxiosApiResponse<T> = AxiosResponse<ApiResponse<T>>;

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
