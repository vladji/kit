import { ColorSchemeName } from 'react-native';
import { Locales } from 'app/locales/types.ts';
import { getDefaultLocale } from 'app/locales/utils.ts';
import { getStoreValue } from 'app/store/lib/asyncStore.ts';
import { StoreKeys } from 'app/store/model/types.ts';

type SetInitialLocale = ({
  localeState,
  setLocale,
}: {
  localeState: Locales;
  setLocale: (locale: Locales) => Promise<void>;
}) => Promise<void>;

export const setInitialLocale: SetInitialLocale = async ({
  localeState,
  setLocale,
}) => {
  const initialLocale = await getStoreValue<Locales>(StoreKeys.Locale);

  if (initialLocale === null) {
    const defaultLocale = await getDefaultLocale();
    await setLocale(defaultLocale);
  }

  if (initialLocale !== null && initialLocale !== localeState) {
    await setLocale(initialLocale);
  }
};

type SetInitialTheme = ({
  themeState,
  setTheme,
}: {
  themeState: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => Promise<void>;
}) => Promise<void>;

export const setInitialTheme: SetInitialTheme = async ({
  themeState,
  setTheme,
}) => {
  const initialTheme = await getStoreValue<ColorSchemeName>(StoreKeys.Theme);

  if (initialTheme === null) {
    await setTheme('light');
  }

  if (initialTheme !== null && initialTheme !== themeState) {
    await setTheme(initialTheme);
  }
};
