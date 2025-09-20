import { Locales } from 'app/locales/types.ts';
import { AdminProps } from 'entities/admin/model/types.ts';
import { MessageProps } from 'entities/chat/model/types.ts';
import { StoreProps } from 'entities/store/model/types.ts';
import { UserProps, UserRolesProps } from 'entities/user/model/types.ts';
import { ThemeType } from 'shared/styles/theme/theme.ts';

export interface SessionStateProps {
  roles: UserRolesProps;
  userProfile: UserProps | null;
  adminProfile: AdminProps | null;
  storeProfile: StoreProps | null;
  setRoles: (roles: UserRolesProps) => void;
  setUserProfile: (profile: UserProps | null) => void;
  setAdminProfile: (profile: AdminProps | null) => void;
  setStoreProfile: (profile: StoreProps | null) => void;
}

interface ChatMetaData {
  chatHistory: MessageProps[];
}

export interface PersistentStoreProps {
  locale: Locales | null;
  theme: ThemeType;
  token: string | null;
  refreshToken: string | null;
  setLocale: (locale: Locales) => void;
  setTheme: (theme: ThemeType) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  chatsMetaData: Record<string, ChatMetaData>;
  setChatHistory: (chatId: string, chatHistory: MessageProps[]) => void;
}
