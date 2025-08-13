import { ReactNode } from 'react';
import { AppContext } from 'app/appContext';
import { useAppContext } from 'app/appContext/useAppContext.ts';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const context = useAppContext();

  return <AppContext value={context}>{children}</AppContext>;
};
