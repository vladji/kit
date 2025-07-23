import api from 'app/api/api.ts';
import { ApiResponse } from 'app/api/types.ts';
import { AdminLoginResponse } from 'features/AdminLogin/api/types.ts';
import { AdminLoginProps } from 'features/AdminLogin/types.ts';

export const postAdminLogin = (
  data: AdminLoginProps,
): Promise<ApiResponse<AdminLoginResponse>> =>
  api({
    url: `/auth/admin/login`,
    method: 'POST',
    data,
  });
