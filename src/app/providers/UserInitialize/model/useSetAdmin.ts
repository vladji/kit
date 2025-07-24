import { useContext, useEffect } from 'react';
import { AppContext } from 'app/appContext';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { getTokenPayload } from 'shared/lib/jwt/getTokenPayload.ts';

export const useSetAdmin = () => {
  const { setRootAdmin, setAdmin } = useContext(AppContext);
  const { data: token } = useGetAsyncStorage<string>(AsyncStorageKeys.Token);

  useEffect(() => {
    if (!token) return;
    const payload = getTokenPayload(token);

    if (payload?.roles[UserRoles.Admin]) {
      setAdmin(true);
    }
    if (payload?.roles[UserRoles.RootAdmin]) {
      setRootAdmin(true);
    }
  }, [token, setAdmin, setRootAdmin]);
};
