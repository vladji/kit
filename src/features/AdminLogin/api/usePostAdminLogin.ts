import { useMutation } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { ApiResponse } from 'app/api/types.ts';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useSessionStore } from 'app/storage/useSessionStore.ts';
import { postAdminLogin } from 'features/AdminLogin/api/requests.ts';
import { AdminLoginResponse } from 'features/AdminLogin/api/types.ts';
import { AdminLoginProps } from 'features/AdminLogin/types.ts';

export const usePostAdminLogin = () => {
  const [setAdminProfile] = useSessionStore(
    useShallow((store) => [store.setAdminProfile]),
  );
  const [setToken, setRefreshToken] = usePersistentStore(
    useShallow((store) => [store.setToken, store.setRefreshToken]),
  );

  const { mutateAsync, isPending } = useMutation<
    ApiResponse<AdminLoginResponse>,
    unknown,
    AdminLoginProps
  >({
    mutationFn: (data) => postAdminLogin(data),
    onSuccess: (response) => {
      if (response.admin.id && response.accessToken && response.refreshToken) {
        setAdminProfile(response.admin);
        setToken(response.accessToken);
        setRefreshToken(response.refreshToken);
      }
    },
  });

  return {
    postAdminLogin: mutateAsync,
    loading: isPending,
  };
};
