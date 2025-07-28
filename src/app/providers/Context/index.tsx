import { ReactNode, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { AppContext } from 'app/appContext';
import { useAppContext } from 'app/appContext/useAppContext.ts';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    contextLoading,
    locale,
    theme,
    chatProfile,
    userAuthProfile,
    roles,
    setLocale,
    setTheme,
    setChatProfile,
    setUserAuthProfile,
    setRoles,
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
        theme,
        chatProfile,
        userAuthProfile,
        roles,
        setLocale,
        setTheme,
        setChatProfile,
        setUserAuthProfile,
        setRoles,
      }}
    >
      {children}
    </AppContext>
  );
};
