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
  Omit<KeyboardAvoidProps, 'translate'>;

export const KeyboardAvoidWrapper: FC<Props> = ({
  children,
  correction,
  includeSafeBottom,
  ...props
}) => {
  const translate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [{ translateY: -translate.value }],
      paddingBottom: translate.value,
    };
  });

  useKeyboardAvoid({
    translate,
    correction,
    includeSafeBottom,
  });

  return (
    <Animated.View {...props} style={[animatedStyle, props.style]}>
      {children}
    </Animated.View>
  );
};
