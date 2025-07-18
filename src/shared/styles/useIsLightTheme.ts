import { useContext } from 'react';
import { AppContext } from 'app/context';

export const useIsLightTheme = () => {
  const { theme } = useContext(AppContext);
  return theme === 'light';
};
