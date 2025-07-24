import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DEFAULT_LOCALE, DEFAULT_THEME } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';

interface AppContextProps {
  locale: Locales;
  theme: ColorSchemeName;
  userAuthProfile: FirebaseAuthTypes.User | null;
  rootAdmin: boolean;
  admin: boolean;
  setLocale: (locale: Locales) => Promise<void>;
  setTheme: (theme: ColorSchemeName) => void;
  setUserAuthProfile: (user: FirebaseAuthTypes.User | null) => void;
  setRootAdmin: (value: boolean) => void;
  setAdmin: (value: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  locale: DEFAULT_LOCALE,
  theme: DEFAULT_THEME,
  userAuthProfile: null,
  rootAdmin: false,
  admin: false,
  setLocale: () => Promise.resolve(),
  setTheme: () => {},
  setUserAuthProfile: () => {},
  setRootAdmin: () => {},
  setAdmin: () => {},
});
