import { Platform } from 'react-native';
import { Locales } from 'app/locales/types.ts';

export const IS_IOS = Platform.OS === 'ios';
export const DEFAULT_LOCALE = Locales.RU;
export const DEFAULT_THEME = 'light';
export const CHAT_SUPPORT = 'chat_support';
