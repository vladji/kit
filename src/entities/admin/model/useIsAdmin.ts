import { useMemo } from 'react';
import { useSessionStore } from 'app/storage/useSessionStore.ts';
import { UserRoles } from 'entities/user/model/types.ts';

export const useIsAdmin = () => {
  const roles = useSessionStore((store) => store.roles);

  return useMemo(() => {
    return {
      admin: roles[UserRoles.Admin],
      rootAdmin: roles[UserRoles.RootAdmin],
      anyAdmin: !!roles[UserRoles.Admin] || !!roles[UserRoles.RootAdmin],
    };
  }, [roles]);
};
