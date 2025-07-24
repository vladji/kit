import { ReactNode } from 'react';
import { useCheckAuth } from 'app/providers/UserInitialize/model/useCheckAuth.ts';
import { useIdentifyUser } from 'app/providers/UserInitialize/model/useIdentifyUser.ts';
import { useSetAdmin } from 'app/providers/UserInitialize/model/useSetAdmin.ts';

export const UserInitialize = ({ children }: { children: ReactNode }) => {
  useIdentifyUser();
  useCheckAuth();
  useSetAdmin();

  return children;
};
