import { ReactNode, useEffect } from 'react';
// import BootSplash from 'react-native-bootsplash';
import { AppContext } from 'app/context';
import { useAppContext } from 'app/context/useAppContext.ts';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { contextLoading, locale, setLocale, theme, setTheme } =
    useAppContext();

  useEffect(() => {
    const hideSplashScreen = async () => {
      // await BootSplash.hide({ fade: true });
      return null;
    };

    if (!contextLoading) {
      hideSplashScreen();
    }
  }, [contextLoading]);

  return (
    <AppContext value={{ locale, setLocale, theme, setTheme }}>
      {children}
    </AppContext>
  );
};
