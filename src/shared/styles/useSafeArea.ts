import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useSafeArea = (): Pick<
  ViewStyle,
  'paddingTop' | 'paddingLeft' | 'paddingBottom' | 'paddingRight'
> => {
  const insets = useSafeAreaInsets();
  return useMemo(() => {
    return {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingBottom: insets.bottom,
      paddingRight: insets.right,
    };
  }, [insets]);
};
