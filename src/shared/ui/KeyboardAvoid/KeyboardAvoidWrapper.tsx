import { FC, ReactNode } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  KeyboardAvoidProps,
  useKeyboardAvoid,
} from 'shared/ui/KeyboardAvoid/useKeyboardAvoid.ts';

type Props = {
  children: ReactNode;
  correction?: number;
  includeSafeBottom?: boolean;
} & ViewProps &
  Omit<KeyboardAvoidProps, 'translateY'>;

export const KeyboardAvoidWrapper: FC<Props> = ({
  children,
  correction,
  includeSafeBottom,
  ...props
}) => {
  const translateY = useSharedValue(0);
  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useKeyboardAvoid({
    translateY,
    correction,
    includeSafeBottom,
  });

  return (
    <Animated.View {...props} style={[animationStyles, props.style]}>
      {children}
    </Animated.View>
  );
};
