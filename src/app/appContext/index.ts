import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DEFAULT_LOCALE, DEFAULT_THEME } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';
import { ChatProfileProps } from 'entities/chat/model/types.ts';
import { UserRoles, UserRolesProps } from 'entities/user/model/types.ts';

interface AppContextProps {
  locale: Locales;
  theme: ColorSchemeName;
  chatProfile: ChatProfileProps | null;
  userAuthProfile: FirebaseAuthTypes.User | null;
  roles: UserRolesProps;
  setLocale: (locale: Locales) => Promise<void>;
  setTheme: (theme: ColorSchemeName) => void;
  setUserAuthProfile: (profile: FirebaseAuthTypes.User | null) => void;
  setChatProfile: (profile: ChatProfileProps | null) => void;
  setRoles: (roles: UserRolesProps) => void;
}

export const AppContext = createContext<AppContextProps>({
  locale: DEFAULT_LOCALE,
  theme: DEFAULT_THEME,
  chatProfile: null,
  userAuthProfile: null,
  roles: { [UserRoles.Client]: true },
  setLocale: () => Promise.resolve(),
  setTheme: () => {},
  setUserAuthProfile: () => {},
  setChatProfile: () => {},
  setRoles: () => {},
});
