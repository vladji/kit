import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DEFAULT_LOCALE, DEFAULT_THEME } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';

type AppState = {
  contextLoading: boolean;
  locale: Locales;
  theme: ColorSchemeName;
  userAuthProfile: FirebaseAuthTypes.User | null;
  rootAdmin: boolean;
  admin: boolean;
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LOCALE'; payload: Locales }
  | { type: 'SET_THEME'; payload: ColorSchemeName }
  | { type: 'SET_USER_AUTH_PROFILE'; payload: FirebaseAuthTypes.User | null }
  | { type: 'SET_ROOT_ADMIN'; payload: boolean }
  | { type: 'SET_ADMIN'; payload: boolean };

export const initialState: AppState = {
  contextLoading: true,
  locale: DEFAULT_LOCALE,
  theme: DEFAULT_THEME,
  userAuthProfile: null,
  rootAdmin: false,
  admin: false,
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, contextLoading: action.payload };
    case 'SET_LOCALE':
      return { ...state, locale: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER_AUTH_PROFILE':
      return { ...state, userAuthProfile: action.payload };
    case 'SET_ROOT_ADMIN':
      return { ...state, rootAdmin: action.payload };
    case 'SET_ADMIN':
      return { ...state, admin: action.payload };
    default:
      return state;
  }
};
