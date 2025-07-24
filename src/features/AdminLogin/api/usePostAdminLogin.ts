import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from 'app/api/types.ts';
import { disconnectSocket } from 'app/providers/Socket/socket.ts';
import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { postAdminLogin } from 'features/AdminLogin/api/requests.ts';
import { AdminLoginResponse } from 'features/AdminLogin/api/types.ts';
import { AdminLoginProps } from 'features/AdminLogin/types.ts';
import { invalidateUser } from 'shared/lib/auth/invalidateUser.ts';

export const usePostAdminLogin = () => {
  const { mutateAsync, isPending } = useMutation<
    ApiResponse<AdminLoginResponse>,
    unknown,
    AdminLoginProps
  >({
    mutationFn: (data) => postAdminLogin(data),
    onSuccess: async (response) => {
      if (response.admin.id && response.accessToken && response.refreshToken) {
        disconnectSocket();

        await Promise.all([
          setAsyncStorageValue(AsyncStorageKeys.UserDbId, response.admin.id),
          setAsyncStorageValue(AsyncStorageKeys.Token, response.accessToken),
          setAsyncStorageValue(
            AsyncStorageKeys.RefreshToken,
            response.refreshToken,
          ),
        ]);

        await invalidateUser();
      }
    },
  });

  return {
    postAdminLogin: mutateAsync,
    loading: isPending,
  };
};
