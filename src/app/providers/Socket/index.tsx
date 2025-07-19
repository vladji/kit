import { ReactNode } from 'react';
import { useSocketConnect } from 'app/providers/Socket/useSocketConnect.ts';

export const SocketConnect = ({ children }: { children: ReactNode }) => {
  useSocketConnect();
  return children;
};
