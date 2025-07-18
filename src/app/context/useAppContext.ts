import { useCallback, useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { setInitialLocale, setInitialTheme } from 'app/context/utils.ts';
import { Locales } from 'app/locales/types.ts';
import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useAppContext = () => {
  const [contextLoading, setContextLoading] = useState<boolean>(true);
  const [localeState, setLocaleState] = useState<Locales>(DEFAULT_LOCALE);
  const [themeState, setThemeState] = useState<ColorSchemeName>('light');
  const [userAuthProfile, setUserAuthProfile] =
    useState<FirebaseAuthTypes.User | null>(null);
  const [rootAdmin, setRootAdmin] = useState(false);

  const setLocale = useCallback(async (locale: Locales) => {
    setLocaleState(locale);
    await setAsyncStorageValue(AsyncStorageKeys.Locale, locale);
  }, []);

  const setTheme = useCallback(async (theme: ColorSchemeName) => {
    setThemeState(theme);
    await setAsyncStorageValue(AsyncStorageKeys.Theme, theme);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await setInitialLocale({ localeState, setLocale });
        await setInitialTheme({ themeState, setTheme });
      } catch (error) {
        return null;
      } finally {
        setContextLoading(false);
      }
    })();
  }, [localeState, setLocale, themeState, setTheme]);

  return {
    contextLoading,
    locale: localeState,
    setLocale,
    theme: themeState,
    setTheme,
    userAuthProfile,
    setUserAuthProfile,
    rootAdmin,
    setRootAdmin,
  };
};
