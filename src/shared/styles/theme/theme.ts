import { COLORS } from 'shared/styles/tokens/colors.ts';

export const lightTheme = {
  main: COLORS.LIGHT,
  brand: COLORS.BRAND,
  brandLight: COLORS.BRAND_LIGHT,
  accentLight: COLORS.ACCENT_LIGHT,
  accentDark: COLORS.ACCENT_DARK,
  muted: COLORS.MUTED_LIGHT_THEME,
  border: COLORS.BORDER,
  messagePrimary: COLORS.MESSAGE_PRIMARY,
  messageSecondary: COLORS.MESSAGE_SECONDARY,
  input: COLORS._LIGHT,
};

export const darkTheme = {
  main: COLORS.DARK,
  brandColor: COLORS.BRAND,
  brandLight: COLORS.BRAND_LIGHT,
  accentLight: COLORS.ACCENT_LIGHT,
  accentDark: COLORS.ACCENT_DARK,
  muted: COLORS.MUTED_DARK_THEME,
  border: COLORS.BORDER,
  messagePrimary: COLORS.MESSAGE_PRIMARY,
  messageSecondary: COLORS.MESSAGE_SECONDARY,
};

export type ThemeType = typeof lightTheme;
