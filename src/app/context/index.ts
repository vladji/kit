import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';

interface AppContextProps {
  locale: Locales;
  setLocale: (locale: Locales) => Promise<void>;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
}

export const AppContext = createContext<AppContextProps>({
  locale: DEFAULT_LOCALE,
  setLocale: () => Promise.resolve(),
  theme: 'light',
  setTheme: () => {},
});
