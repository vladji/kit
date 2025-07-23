import { AdminProps } from 'entities/admin/model/types.ts';

export interface AdminLoginResponse {
  admin: AdminProps;
  accessToken: string;
  refreshToken: string;
}
