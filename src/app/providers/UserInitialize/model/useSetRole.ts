import { useEffect } from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useSessionStore } from 'app/storage/useSessionStore.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { getTokenPayload } from 'shared/lib/jwt/getTokenPayload.ts';

export const useSetRoles = () => {
  const token = usePersistentStore((store) => store.token);
  const setRoles = useSessionStore((store) => store.setRoles);

  useEffect(() => {
    if (token) {
      const payload = getTokenPayload(token);
      const roles = payload?.roles || { [UserRoles.Client]: true };
      setRoles(roles);
    }

    if (!token) {
      setRoles({ [UserRoles.Client]: true });
    }
  }, [token, setRoles]);
};
