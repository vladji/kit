import { useContext } from 'react';
import { AppContext } from 'app/appContext';
import { UserRoles } from 'entities/user/model/types.ts';

export const useIsAdmin = () => {
  const { roles } = useContext(AppContext);
  const anyAdmin = roles[UserRoles.Admin] || roles[UserRoles.RootAdmin];

  return {
    admin: roles[UserRoles.Admin],
    rootAdmin: roles[UserRoles.RootAdmin],
    anyAdmin,
  };
};
