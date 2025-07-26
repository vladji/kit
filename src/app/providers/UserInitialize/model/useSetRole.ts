import { useContext } from 'react';
import { AppContext } from 'app/appContext';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { UserRoles, UserRolesProps } from 'entities/user/model/types.ts';
import { getTokenPayload } from 'shared/lib/jwt/getTokenPayload.ts';

export const useSetRoles = () => {
  const { data: token } = useGetAsyncStorage<string>(AsyncStorageKeys.Token);
  const { setRoles } = useContext(AppContext);

  if (token) {
    const payload = getTokenPayload(token);
    const roles: UserRolesProps = payload?.roles || {
      [UserRoles.Client]: true,
    };
    setRoles(roles);
  } else {
    setRoles({ [UserRoles.Client]: true });
  }
};
