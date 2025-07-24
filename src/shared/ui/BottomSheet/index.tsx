import { ReactElement, ReactNode, memo, useCallback, useMemo } from 'react';
import {
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { IS_IOS } from 'app/config/constants.ts';
import { ANIMATION_DURATION } from 'shared/styles/constants/animation.ts';
import { TRANSPARENT } from 'shared/styles/constants/colors.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { useKeyboardAvoid } from 'shared/ui/KeyboardAvoid/useKeyboardAvoid.ts';
import { Spinner } from 'shared/ui/Spinner';
import { Typography } from 'shared/ui/Typography';

type Animation = ({
  topValue,
  bottomValue,
  onClose,
}: {
  topValue: number;
  bottomValue: number;
  onClose?: () => void;
}) => void;

interface Props {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactElement | string;
  loading?: boolean;
  showDecor?: boolean;
}

export const BottomSheet = memo(
  ({
    show,
    onClose,
    children,
    title,
    loading = false,
    showDecor = true,
  }: Props) => {
    const { colors } = useStyles();
    const { height: screenHeight } = useSafeAreaFrame();
    const { bottom: safeBottom } = useSafeAreaInsets();

    const top = useSharedValue(screenHeight);
    const bottom = useSharedValue(-screenHeight);
    const translateY = useSharedValue(0);
    const paddingBottom = useSharedValue(0);

    useKeyboardAvoid({ translateY });

    const animation = useCallback<Animation>(
      ({ topValue, bottomValue, onClose }) => {
        top.value = withTiming(
          topValue,
          { duration: ANIMATION_DURATION * 1.2 },
          () => {
            if (onClose) {
              runOnJS(onClose)();
            }
          },
        );

        bottom.value = withTiming(bottomValue, {
          duration: ANIMATION_DURATION * 1.2,
        });
      },
      [top, bottom],
    );

    const panResponder = useMemo(() => {
      return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.value = gestureState.dy;
          }
          if (gestureState.dy < 0) {
            paddingBottom.value = Math.abs(gestureState.dy / 2);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          paddingBottom.value = withSpring(0, { damping: 20, stiffness: 200 });

          if (gestureState.dy >= 0 && gestureState.dy <= 50) {
            translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
          }

          if (gestureState.dy > 50) {
            animation({
              topValue: screenHeight,
              bottomValue: -screenHeight,
              onClose: () => {
                translateY.value = 0;
                onClose();
              },
            });
          }
        },
      });
    }, [translateY, paddingBottom, screenHeight, onClose, animation]);

    const onShow = useCallback(() => {
      animation({ topValue: 0, bottomValue: 0 });
    }, [animation]);

    const onRequestClose = useCallback(() => {
      animation({
        topValue: screenHeight,
        bottomValue: -screenHeight,
        onClose: () => {
          onClose();
        },
      });
    }, [animation, screenHeight, onClose]);

    const backgroundAnimationStyle = useAnimatedStyle(() => {
      const interpolatedColor = interpolateColor(
        top.value,
        [screenHeight, 0],
        ['rgba(32, 6, 1, 0)', 'rgba(32, 6, 1, 0.20)'],
      );

      return {
        backgroundColor: interpolatedColor,
      };
    });

    const sheetLayoutAnimationStyle = useAnimatedStyle(() => {
      return {
        top: top.value,
        bottom: bottom.value,
      };
    });

    const sheetAnimationStyle = useAnimatedStyle(() => {
      return {
        paddingBottom: paddingBottom.value,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <Modal visible={show} transparent animationType="none" onShow={onShow}>
        {loading && <Spinner />}
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <Animated.View style={[backgroundAnimationStyle, styles.background]}>
            <Animated.View
              style={[styles.sheetLayout, sheetLayoutAnimationStyle]}
            >
              <Animated.View
                style={[styles.sheet, colors().main, sheetAnimationStyle]}
                {...panResponder.panHandlers}
              >
                {showDecor && <View style={[styles.decor, colors().muted]} />}
                <View
                  style={{
                    gap: Sizes.Default,
                    paddingTop: showDecor ? Sizes.Default : Sizes.Micro,
                    paddingBottom: IS_IOS
                      ? Sizes.Micro + safeBottom
                      : Sizes.Big + safeBottom,
                    paddingHorizontal: Sizes.Default,
                    backgroundColor: TRANSPARENT,
                  }}
                >
                  {!!title && <Typography weight="500">{title}</Typography>}
                  {children}
                </View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  sheetLayout: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    paddingLeft: Sizes.Mini,
    paddingRight: Sizes.Mini,
    backgroundColor: TRANSPARENT,
  },
  sheet: {
    paddingTop: Sizes.Default,
    borderTopRightRadius: Sizes.Default,
    borderTopLeftRadius: Sizes.Default,
  },
  decor: {
    position: 'absolute',
    top: Sizes.Medium,
    left: '50%',
    transform: [{ translateX: -32 }],
    width: 64,
    height: 4,
    borderRadius: 2,
  },
});
