import { Platform } from 'react-native';
import { IS_IOS } from 'app/config/constants.ts';

export const COLORS = {
  TRANSPARENT: '#fff00',
  BRAND: '#20748b',
  BRAND_LIGHT: '#2b9ebd',
  ACCENT_LIGHT: '#b18121',
  ACCENT_DARK: '#71450e',
  DARK: '#201c19',
  DARK_MUTED: 'rgba(0,0,0,0.56)',
  _LIGHT: '#fff',
  LIGHT: '#f1f1f1',
  MUTED_LIGHT_THEME: '#f3f3f3',
  MUTED_DARK_THEME: '#dadada',
  BORDER: '#c6c6c6',
  MESSAGE_PRIMARY: '#58a5b6',
  MESSAGE_SECONDARY: '#b6ab92',
};

export const SHADOW_COLOR = IS_IOS ? 'rgba(146, 146, 146, 0.3)' : '#0e0e0e';

export const SHADOW = {
  ...Platform.select({
    ios: {
      shadowColor: SHADOW_COLOR,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
    },
  }),
};
