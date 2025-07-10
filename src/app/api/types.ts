export interface BaseApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export type ApiResponse<T> = BaseApiResponse & T;
