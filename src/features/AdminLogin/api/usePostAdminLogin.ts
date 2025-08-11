import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from 'app/api/types.ts';
import { AppContext } from 'app/appContext';
import { disconnectSocket } from 'app/providers/Socket/socket.ts';
import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { ChatProfileProps } from 'entities/chat/model/types.ts';
import { UserRoles, UserRolesProps } from 'entities/user/model/types.ts';
import { postAdminLogin } from 'features/AdminLogin/api/requests.ts';
import { AdminLoginResponse } from 'features/AdminLogin/api/types.ts';
import { AdminLoginProps } from 'features/AdminLogin/types.ts';
import { invalidateUser } from 'shared/lib/auth/invalidateUser.ts';
import { getTokenPayload } from 'shared/lib/jwt/getTokenPayload.ts';

export const usePostAdminLogin = () => {
  const { setRoles, setChatProfile } = useContext(AppContext);

  const { mutateAsync, isPending } = useMutation<
    ApiResponse<AdminLoginResponse>,
    unknown,
    AdminLoginProps
  >({
    mutationFn: (data) => postAdminLogin(data),
    onSuccess: async (response) => {
      if (response.admin.id && response.accessToken && response.refreshToken) {
        disconnectSocket();

        const profile = response.admin;
        const token = response.accessToken;
        const payload = getTokenPayload(token);

        const roles: UserRolesProps = payload?.roles || {
          [UserRoles.Client]: true,
        };

        setRoles(roles);

        const chatProfile: ChatProfileProps = {
          userId: profile.id,
          chatName: profile.name || 'Admin',
          avatarUrl: profile.avatarUrl,
        };

        setChatProfile(chatProfile);

        await Promise.all([
          setAsyncStorageValue(AsyncStorageKeys.UserId, response.admin.id),
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
