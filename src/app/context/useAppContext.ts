import { useCallback, useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { setInitialLocale, setInitialTheme } from 'app/context/utils.ts';
import { Locales } from 'app/locales/types.ts';
import { setStoreValue } from 'app/store/lib/asyncStore.ts';
import { StoreKeys } from 'app/store/model/types.ts';

export const useAppContext = () => {
  const [contextLoading, setContextLoading] = useState<boolean>(true);
  const [localeState, setLocaleState] = useState<Locales>(DEFAULT_LOCALE);
  const [themeState, setThemeState] = useState<ColorSchemeName>('light');

  const setLocale = useCallback(async (locale: Locales) => {
    setLocaleState(locale);
    await setStoreValue(StoreKeys.Locale, locale);
  }, []);

  const setTheme = useCallback(async (theme: ColorSchemeName) => {
    setThemeState(theme);
    await setStoreValue(StoreKeys.Theme, theme);
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
  };
};
