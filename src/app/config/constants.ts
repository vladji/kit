import { Platform } from 'react-native';
import { Locales } from 'app/locales/types.ts';

export const IS_IOS = Platform.OS === 'ios';
export const DEFAULT_LOCALE = Locales.EN;
