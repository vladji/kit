import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DEFAULT_LOCALE, DEFAULT_THEME } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';

interface AppContextProps {
  locale: Locales;
  setLocale: (locale: Locales) => Promise<void>;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
  userAuthProfile: FirebaseAuthTypes.User | null;
  setUserAuthProfile: (user: FirebaseAuthTypes.User | null) => void;
  rootAdmin: boolean;
  setRootAdmin: (value: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  locale: DEFAULT_LOCALE,
  setLocale: () => Promise.resolve(),
  theme: DEFAULT_THEME,
  setTheme: () => {},
  userAuthProfile: null,
  setUserAuthProfile: () => {},
  rootAdmin: false,
  setRootAdmin: () => {},
});
