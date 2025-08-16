import { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Keyboard,
  PanResponder,
  ScrollView,
  ScrollViewProps,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { IS_IOS } from 'app/config/constants.ts';
import { ANIMATION_DURATION } from 'shared/styles/tokens/animation.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';

interface ScrollKeyboardAvoidProps extends ScrollViewProps {
  children: ReactNode;
}

const SAFE_AREA = SPACING.DEFAULT;

export const ScrollKeyboardAvoid: FC<ScrollKeyboardAvoidProps> = ({
  children,
  ...props
}) => {
  const measure = useRef({ pageY: 0, height: 0 }).current;
  const { height: screenHeight } = useWindowDimensions();
  const translateY = useSharedValue(0);

  // TODO: deprecated
  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponderCapture: ({ target }) => {
        (target as any).measure(
          (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number,
          ) => {
            measure.pageY = pageY;
            measure.height = height;
          },
        );
        return false;
      },
    });
  }, [measure]);

  const animation = useCallback(
    (value: number) => {
      translateY.value = withTiming(value, { duration: ANIMATION_DURATION });
    },
    [translateY],
  );

  const keyboardShow = useCallback(
    (keyboardHeight: number) => {
      const trashHoldPageYPos = screenHeight - keyboardHeight;
      const itemPageYPos = measure.pageY + measure.height;
      const trashHoldDistance = itemPageYPos - trashHoldPageYPos;

      if (trashHoldDistance > 0) {
        animation(-(trashHoldDistance + SAFE_AREA));
      }
    },
    [screenHeight, measure.pageY, measure.height, animation],
  );

  const keyboardHide = useCallback(() => {
    animation(0);
  }, [animation]);

  useEffect(() => {
    if (IS_IOS) {
      const showSubscription = Keyboard.addListener(
        'keyboardWillShow',
        (event) => {
          const keyboardHeight = event.endCoordinates.height;
          keyboardShow(keyboardHeight);
        },
      );

      const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
        keyboardHide();
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [keyboardShow, keyboardHide]);

  useEffect(() => {
    if (!IS_IOS) {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        animation(-SAFE_AREA);
      });

      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        animation(0);
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [animation]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={animatedStyles} {...panResponder.panHandlers}>
      <ScrollView {...props}>{children}</ScrollView>
    </Animated.View>
  );
};
