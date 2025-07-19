import { ReactNode } from 'react';
import { useCheckAuth } from 'entities/user/model/useCheckAuth.ts';
import { useSocketConnect } from 'entities/user/model/useSocketConnect.ts';
import { useUniqueId } from 'entities/user/model/useUniqueId.ts';

export const UserInitialize = ({ children }: { children: ReactNode }) => {
  useUniqueId();
  useCheckAuth();
  useSocketConnect();

  return children;
};
