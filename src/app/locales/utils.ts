import { getLocales } from 'react-native-localize';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';

export const getDeviceLocale = (): Locales[] => {
  try {
    const deviceLocales = getLocales();
    return deviceLocales.map((locale) => locale.languageCode as Locales);
  } catch {
    console.log('error getDeviceLocale');
    return [DEFAULT_LOCALE];
  }
};

export const getDefaultLocale = async (): Promise<Locales> => {
  const deviceLocales = getDeviceLocale();

  if (deviceLocales.includes(Locales.RU)) {
    return Locales.RU;
  }

  const locales = Object.values(Locales).reduce<Record<string, string>>(
    (acc, locale) => ({
      ...acc,
      [locale]: locale,
    }),
    {},
  );

  const knownLocale = deviceLocales.some((locale) => locales[locale]);

  if (!knownLocale) {
    return DEFAULT_LOCALE;
  } else {
    return deviceLocales[0] as Locales;
  }
};
