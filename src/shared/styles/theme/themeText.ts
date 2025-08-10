import { COLORS } from 'shared/styles/tokens/colors.ts';
import { TEXT_COLORS } from 'shared/styles/tokens/font.ts';

export const lightThemeText = {
  main: TEXT_COLORS.DARK,
  light: TEXT_COLORS.LIGHT,
  dark: TEXT_COLORS.DARK,
  muted: COLORS.MUTED_LIGHT_THEME,
  alert: TEXT_COLORS.ALERT,
};

export const darkThemeText = {
  main: TEXT_COLORS.LIGHT,
  light: TEXT_COLORS.LIGHT,
  dark: TEXT_COLORS.DARK,
  muted: COLORS.MUTED_DARK_THEME,
  alert: TEXT_COLORS.ALERT,
};
