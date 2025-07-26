import { ReactNode } from 'react';
import { useCheckAuth } from 'app/providers/UserInitialize/model/useCheckAuth.ts';
import { useIdentifyUser } from 'app/providers/UserInitialize/model/useIdentifyUser.ts';
import { useSetRoles } from 'app/providers/UserInitialize/model/useSetRole.ts';

export const UserInitialize = ({ children }: { children: ReactNode }) => {
  useIdentifyUser();
  useCheckAuth();
  useSetRoles();

  return children;
};
