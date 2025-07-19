import { ReactNode } from 'react';
import { useCheckAuth } from 'entities/user/model/useCheckAuth.ts';
import { useUniqueId } from 'entities/user/model/useUniqueId.ts';

export const UserInitialize = ({ children }: { children: ReactNode }) => {
  useUniqueId();
  useCheckAuth();

  return children;
};
