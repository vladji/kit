import { useMemo } from 'react';
import {
  ACCENT_DARK,
  ACCENT_LIGHT,
  BORDER_COLOR,
  BRAND_COLOR,
  BRAND_LIGHT,
  DARK_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_COLOR,
  MUTED_DARK_THEME,
  MUTED_LIGHT_THEME,
} from 'shared/styles/constants/colors.ts';
import { useIsLightTheme } from 'shared/styles/useIsLightTheme.ts';

export const useStyles = () => {
  const isLight = useIsLightTheme();

  return useMemo(() => {
    const colors = (prop?: 'backgroundColor' | 'borderColor') => {
      const styleProp = prop ?? 'backgroundColor';
      return {
        brand: { [styleProp]: BRAND_COLOR },
        brandLight: { [styleProp]: BRAND_LIGHT },
        accentLight: { [styleProp]: ACCENT_LIGHT },
        accentDark: { [styleProp]: ACCENT_DARK },
        main: { [styleProp]: isLight ? LIGHT_COLOR : DARK_COLOR },
        muted: { [styleProp]: isLight ? MUTED_LIGHT_THEME : MUTED_DARK_THEME },
        border: { borderColor: BORDER_COLOR },
        messageFrom: { backgroundColor: isLight ? '#d5bca4' : '#d5bca4' },
        messageTo: { backgroundColor: isLight ? '#81b3be' : '#81b3be' },
      };
    };

    const fontColors = {
      main: { color: isLight ? DARK_TEXT_COLOR : '#fff' },
      light: { color: '#fff' },
      dark: { color: DARK_TEXT_COLOR },
      muted: { color: isLight ? MUTED_LIGHT_THEME : MUTED_DARK_THEME },
      alert: { color: isLight ? '#e00' : '#e00' },
    };

    return {
      colors,
      fontColors,
    };
  }, [isLight]);
};
