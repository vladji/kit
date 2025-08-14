import { ReactNode } from 'react';
import { useInitializeAdmin } from 'app/providers/UserInitialize/model/useInitializeAdmin.ts';
import { useInitializeUser } from 'app/providers/UserInitialize/model/useInitializeUser.ts';
import { useSetRoles } from 'app/providers/UserInitialize/model/useSetRole.ts';

export const UserInitialize = ({ children }: { children: ReactNode }) => {
  useInitializeUser();
  useSetRoles();
  useInitializeAdmin();
  return children;
};
