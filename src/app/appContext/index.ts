import { createContext } from 'react';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';
import { AdminProps } from 'entities/admin/model/types.ts';
import { StoreProps } from 'entities/store/model/types.ts';
import {
  UserProps,
  UserRoles,
  UserRolesProps,
} from 'entities/user/model/types.ts';

interface AppContextProps {
  locale: Locales;
  userProfile: UserProps | null;
  adminProfile: AdminProps | null;
  storeProfile: StoreProps | null;
  roles: UserRolesProps;
  setLocale: (locale: Locales) => void;
  setUserProfile: (profile: UserProps | null) => void;
  setAdminProfile: (profile: AdminProps | null) => void;
  setStoreProfile: (profile: StoreProps | null) => void;
  setRoles: (roles: UserRolesProps) => void;
}

export const AppContext = createContext<AppContextProps>({
  locale: DEFAULT_LOCALE,
  userProfile: null,
  adminProfile: null,
  storeProfile: null,
  roles: { [UserRoles.Client]: true },
  setLocale: () => {},
  setUserProfile: () => {},
  setAdminProfile: () => {},
  setStoreProfile: () => {},
  setRoles: () => {},
});
