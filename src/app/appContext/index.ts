import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DEFAULT_LOCALE, DEFAULT_THEME } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';
import {
  UserPublicProfileProps,
  UserRoles,
  UserRolesProps,
} from 'entities/user/model/types.ts';

interface AppContextProps {
  locale: Locales;
  theme: ColorSchemeName;
  userPublicProfile: UserPublicProfileProps | null;
  userAuthProfile: FirebaseAuthTypes.User | null;
  roles: UserRolesProps;
  setLocale: (locale: Locales) => Promise<void>;
  setTheme: (theme: ColorSchemeName) => void;
  setUserAuthProfile: (profile: FirebaseAuthTypes.User | null) => void;
  setUserPublicProfile: (profile: UserPublicProfileProps | null) => void;
  setRoles: (roles: UserRolesProps) => void;
}

export const AppContext = createContext<AppContextProps>({
  locale: DEFAULT_LOCALE,
  theme: DEFAULT_THEME,
  userPublicProfile: null,
  userAuthProfile: null,
  roles: { [UserRoles.Client]: true },
  setLocale: () => Promise.resolve(),
  setTheme: () => {},
  setUserAuthProfile: () => {},
  setUserPublicProfile: () => {},
  setRoles: () => {},
});
