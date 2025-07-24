import { useContext } from 'react';
import { AppContext } from 'app/appContext';

export const useIsLightTheme = () => {
  const { theme } = useContext(AppContext);
  return theme === 'light';
};
