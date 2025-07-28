import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { DEFAULT_LOCALE, DEFAULT_THEME } from 'app/config/constants.ts';
import { Locales } from 'app/locales/types.ts';
import { ChatProfileProps } from 'entities/chat/model/types.ts';
import { UserRoles, UserRolesProps } from 'entities/user/model/types.ts';

type AppState = {
  contextLoading: boolean;
  locale: Locales;
  theme: ColorSchemeName;
  chatProfile: ChatProfileProps | null;
  userAuthProfile: FirebaseAuthTypes.User | null;
  roles: UserRolesProps;
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LOCALE'; payload: Locales }
  | { type: 'SET_THEME'; payload: ColorSchemeName }
  | { type: 'SET_CHAT_PROFILE'; payload: ChatProfileProps | null }
  | { type: 'SET_USER_AUTH_PROFILE'; payload: FirebaseAuthTypes.User | null }
  | { type: 'SET_ROLES'; payload: UserRolesProps };

export const initialState: AppState = {
  contextLoading: true,
  locale: DEFAULT_LOCALE,
  theme: DEFAULT_THEME,
  chatProfile: null,
  userAuthProfile: null,
  roles: { [UserRoles.Client]: true },
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, contextLoading: action.payload };
    case 'SET_LOCALE':
      return { ...state, locale: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_CHAT_PROFILE':
      return { ...state, chatProfile: action.payload };
    case 'SET_USER_AUTH_PROFILE':
      return { ...state, userAuthProfile: action.payload };
    case 'SET_ROLES':
      return { ...state, roles: action.payload };
    default:
      return state;
  }
};
