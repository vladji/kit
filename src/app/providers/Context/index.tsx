import { ReactNode, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { AppContext } from 'app/context';
import { useAppContext } from 'app/context/useAppContext.ts';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    contextLoading,
    locale,
    setLocale,
    theme,
    setTheme,
    userAuthProfile,
    setUserAuthProfile,
  } = useAppContext();

  useEffect(() => {
    const hideSplashScreen = async () => {
      await BootSplash.hide({ fade: true });
      return null;
    };

    if (!contextLoading) {
      hideSplashScreen();
    }
  }, [contextLoading]);

  return (
    <AppContext
      value={{
        locale,
        setLocale,
        theme,
        setTheme,
        userAuthProfile,
        setUserAuthProfile,
      }}
    >
      {children}
    </AppContext>
  );
};
