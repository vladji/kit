import { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { SharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_IOS } from 'app/config/constants.ts';
import { ANIMATION_DURATION } from 'shared/styles/tokens/animation.ts';

export interface KeyboardAvoidProps {
  translateY: SharedValue<number>;
  correction?: number;
  includeSafeBottom?: boolean;
}

export const useKeyboardAvoid = ({
  translateY,
  correction = 0,
  includeSafeBottom = false,
}: KeyboardAvoidProps) => {
  const { bottom } = useSafeAreaInsets();
  const safeBottom = includeSafeBottom ? bottom : 0;

  const animation = useCallback(
    (value: number) => {
      translateY.value = withTiming(value, { duration: ANIMATION_DURATION });
    },
    [translateY],
  );

  useEffect(() => {
    if (IS_IOS) {
      const showSubscription = Keyboard.addListener(
        'keyboardWillShow',
        (event) => {
          const keyboardHeight = event.endCoordinates.height;
          const value = keyboardHeight - correction - safeBottom;
          animation(-value);
        },
      );

      const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
        animation(0);
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [animation, correction, safeBottom]);
};
