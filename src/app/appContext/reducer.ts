import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';
import { AdminProps } from 'entities/admin/model/types.ts';
import { StoreProps } from 'entities/store/model/types.ts';
import {
  UserProps,
  UserRoles,
  UserRolesProps,
} from 'entities/user/model/types.ts';

type AppState = {
  locale: Locales;
  userProfile: UserProps | null;
  adminProfile: AdminProps | null;
  storeProfile: StoreProps | null;
  roles: UserRolesProps;
};

type Action =
  | { type: 'SET_LOCALE'; payload: Locales }
  | { type: 'SET_USER_PROFILE'; payload: UserProps | null }
  | { type: 'SET_ADMIN_PROFILE'; payload: AdminProps | null }
  | { type: 'SET_STORE_PROFILE'; payload: StoreProps | null }
  | { type: 'SET_ROLES'; payload: UserRolesProps };

export const initialState: AppState = {
  locale: DEFAULT_LOCALE,
  userProfile: null,
  adminProfile: null,
  storeProfile: null,
  roles: { [UserRoles.Client]: true },
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOCALE':
      return { ...state, locale: action.payload };
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload };
    case 'SET_ADMIN_PROFILE':
      return { ...state, adminProfile: action.payload };
    case 'SET_STORE_PROFILE':
      return { ...state, storeProfile: action.payload };
    case 'SET_ROLES':
      return { ...state, roles: action.payload };
    default:
      return state;
  }
};
