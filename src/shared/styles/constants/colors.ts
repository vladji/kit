import { IS_IOS } from 'app/config/constants.ts';

export const TRANSPARENT = '#ffffff00';
export const BRAND_COLOR = '#20748b';
export const BRAND_LIGHT = '#2b9ebd';
export const ACCENT_LIGHT = '#b18121';
export const ACCENT_DARK = '#71450e';
export const DARK_COLOR = '#201c19';
export const DARK_TEXT_COLOR = '#0e0e0e';
export const LIGHT_COLOR = '#f1f1f1';
export const MUTED_LIGHT_THEME = '#dadada';
export const MUTED_DARK_THEME = '#dadada';
export const BORDER_COLOR = '#c6c6c6';

export const SHADOW_COLOR = IS_IOS
  ? 'rgba(146, 146, 146, 0.3)'
  : DARK_TEXT_COLOR;

export const SHADOW = {
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 1,
  shadowRadius: 4,
  shadowColor: SHADOW_COLOR,
  elevation: 3,
};
