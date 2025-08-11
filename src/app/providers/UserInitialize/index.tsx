import { ReactNode } from 'react';
import { useInitialize } from 'app/providers/UserInitialize/model/useInitialize.ts';

export const UserInitialize = ({ children }: { children: ReactNode }) => {
  useInitialize();
  return children;
};
