import { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { SharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_IOS } from 'app/config/constants.ts';
import { ANIMATION_DURATION_KEYBOARD } from 'shared/styles/tokens/animation.ts';

export interface KeyboardAvoidProps {
  translate: SharedValue<number>;
  correction?: number;
  includeSafeBottom?: boolean;
}

export const useKeyboardAvoid = ({
  translate,
  correction = 0,
  includeSafeBottom = false,
}: KeyboardAvoidProps) => {
  const { bottom } = useSafeAreaInsets();
  const safeBottom = includeSafeBottom ? bottom : 0;

  const animation = useCallback(
    (value: number) => {
      translate.value = withSpring(value, {
        duration: ANIMATION_DURATION_KEYBOARD,
      });
    },
    [translate],
  );

  useEffect(() => {
    if (IS_IOS) {
      const showSubscription = Keyboard.addListener(
        'keyboardWillShow',
        (event) => {
          Keyboard.scheduleLayoutAnimation(event);
          const keyboardHeight = event.endCoordinates.height;
          const height = keyboardHeight - safeBottom + correction;
          animation(height);
        },
      );

      const hideSubscription = Keyboard.addListener(
        'keyboardWillHide',
        (event) => {
          Keyboard.scheduleLayoutAnimation(event);
          animation(0);
        },
      );

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [animation, correction, safeBottom]);
};
