import { useContext, useMemo } from 'react';
import { AppContext } from 'app/context';
import {
  BRAND_COLOR,
  DARK_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_COLOR,
} from 'shared/styles/constants/colors.ts';

export const useStyles = () => {
  const { theme } = useContext(AppContext);
  const isLight = theme === 'light';

  return useMemo(() => {
    const colors = (prop?: 'backgroundColor' | 'borderColor') => {
      const styleProp = prop ?? 'backgroundColor';
      return {
        brand: { [styleProp]: BRAND_COLOR },
        brandLight: { [styleProp]: '#69fff8' },
        accentLight: { [styleProp]: '#b18121' },
        accentDark: { [styleProp]: '#71450e' },
        main: { [styleProp]: isLight ? LIGHT_COLOR : DARK_COLOR },
        muted: { [styleProp]: isLight ? '#737373' : '#9f9f9f' },
        border: { borderColor: '#c6c6c6' },
      };
    };

    const fontColors = {
      main: { color: isLight ? DARK_TEXT_COLOR : '#fff' },
      light: { color: '#fff' },
      dark: { color: DARK_TEXT_COLOR },
      muted: { color: isLight ? '#737373' : '#9f9f9f' },
    };

    return {
      colors,
      fontColors,
    };
  }, [isLight]);
};
