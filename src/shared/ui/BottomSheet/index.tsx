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
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ANIMATION_DURATION } from 'shared/styles/tokens/animation.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
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
    const { height: screenHeight } = useSafeAreaFrame();
    const { bottom: safeBottom } = useSafeAreaInsets();

    const contentStyles = getContentStyles(showDecor, safeBottom);

    const top = useSharedValue(screenHeight);
    const bottom = useSharedValue(-screenHeight);
    const paddingBottom = useSharedValue(0);

    useKeyboardAvoid({ translate: paddingBottom });

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
            paddingBottom.value = gestureState.dy;
          }
          if (gestureState.dy < 0) {
            paddingBottom.value = Math.abs(gestureState.dy / 2);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          paddingBottom.value = withSpring(0, { damping: 20, stiffness: 200 });

          if (gestureState.dy >= 0 && gestureState.dy <= 50) {
            paddingBottom.value = withSpring(0, {
              damping: 20,
              stiffness: 200,
            });
          }

          if (gestureState.dy > 50) {
            animation({
              topValue: screenHeight,
              bottomValue: -screenHeight,
              onClose: () => {
                paddingBottom.value = 0;
                onClose();
              },
            });
          }
        },
      });
    }, [paddingBottom, screenHeight, onClose, animation]);

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
                style={[styles.sheet, sheetAnimationStyle]}
                {...panResponder.panHandlers}
              >
                {showDecor && <View style={styles.decor} />}
                <View style={contentStyles.wrapper}>
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
    paddingLeft: SPACING.MINI,
    paddingRight: SPACING.MINI,
    backgroundColor: 'transparent',
  },
  sheet: {
    paddingTop: SPACING.DEFAULT,
    borderTopRightRadius: SPACING.DEFAULT,
    borderTopLeftRadius: SPACING.DEFAULT,
    backgroundColor: lightTheme.main,
  },
  decor: {
    position: 'absolute',
    top: SPACING.MEDIUM,
    left: '50%',
    transform: [{ translateX: -32 }],
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: lightTheme.muted,
  },
});

const getContentStyles = (showDecor: boolean, safeBottom: number) =>
  StyleSheet.create({
    wrapper: {
      gap: SPACING.DEFAULT,
      paddingTop: showDecor ? SPACING.DEFAULT : SPACING.MICRO,
      paddingBottom: IS_IOS
        ? SPACING.MICRO + safeBottom
        : SPACING.BIG + safeBottom,
      paddingHorizontal: SPACING.DEFAULT,
      backgroundColor: 'transparent',
    },
  });
