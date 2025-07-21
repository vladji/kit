import { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { SharedValue, withTiming } from 'react-native-reanimated';
import { IS_IOS } from 'app/config/constants.ts';
import { ANIMATION_DURATION } from 'shared/styles/constants/animation.ts';

interface Props {
  translateY: SharedValue<number>;
}

export const useKeyboardAvoid = ({ translateY }: Props) => {
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
          animation(-keyboardHeight);
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
  }, [animation]);
};
