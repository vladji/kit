import { ReactNode, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { AppContext } from 'app/appContext';
import { useAppContext } from 'app/appContext/useAppContext.ts';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    contextLoading,
    locale,
    setLocale,
    theme,
    setTheme,
    userAuthProfile,
    setUserAuthProfile,
    rootAdmin,
    setRootAdmin,
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
        rootAdmin,
        setRootAdmin,
      }}
    >
      {children}
    </AppContext>
  );
};
