import { ReactElement, ReactNode, memo, useCallback, useMemo } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
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
import { ANIMATION_DURATION_COMMON } from 'shared/styles/tokens/animation.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { useKeyboardAvoid } from 'shared/ui/KeyboardAvoid/useKeyboardAvoid.ts';
import { Spinner } from 'shared/ui/Spinner';
import { Typography } from 'shared/ui/Typography';

type Animation = ({
  bottomValue,
  onClose,
}: {
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

    const bottom = useSharedValue(-screenHeight);
    const paddingBottom = useSharedValue(0);
    const translateY = useSharedValue(0);

    useKeyboardAvoid({ translate: paddingBottom });

    const animation = useCallback<Animation>(
      ({ bottomValue, onClose }) => {
        bottom.value = withTiming(
          bottomValue,
          {
            duration: ANIMATION_DURATION_COMMON * 1.2,
          },
          (finished) => {
            if (finished && onClose) {
              runOnJS(onClose)();
            }
          },
        );
      },
      [bottom],
    );

    const onShow = useCallback(() => {
      animation({ bottomValue: 0 });
    }, [animation]);

    const onRequestClose = useCallback(() => {
      animation({
        bottomValue: -screenHeight,
        onClose,
      });
    }, [animation, screenHeight, onClose]);

    const panGesture = useMemo(
      () =>
        Gesture.Pan()
          .onUpdate((event) => {
            if (event.translationY > 0) {
              translateY.value = event.translationY;
            }
            if (event.translationY < 0) {
              paddingBottom.value = Math.abs(event.translationY / 2);
            }
          })
          .onEnd((event) => {
            paddingBottom.value = withSpring(0, {
              damping: 200,
            });
            translateY.value = withSpring(0, {
              damping: 200,
            });

            if (event.translationY > 50) {
              runOnJS(animation)({
                bottomValue: -screenHeight,
                onClose,
              });
            }
          }),
      [animation, onClose, paddingBottom, translateY, screenHeight],
    );

    const backgroundAnimationStyle = useAnimatedStyle(() => {
      const interpolatedColor = interpolateColor(
        -bottom.value,
        [screenHeight, 0],
        ['rgba(32, 6, 1, 0)', 'rgba(32, 6, 1, 0.20)'],
      );

      return {
        backgroundColor: interpolatedColor,
      };
    });

    const sheetAnimationStyle = useAnimatedStyle(() => {
      return {
        bottom: bottom.value,
        paddingBottom: paddingBottom.value,
        transform: [{ translateY: translateY.value }],
      };
    });

    const contentStyles = useMemo(
      () => getContentStyles(showDecor, safeBottom),
      [showDecor, safeBottom],
    );

    return (
      <Modal visible={show} transparent animationType="none" onShow={onShow}>
        {loading && <Spinner />}
        <GestureHandlerRootView>
          <Pressable style={StyleSheet.absoluteFill} onPress={onRequestClose}>
            <Animated.View style={[styles.flex, backgroundAnimationStyle]} />
          </Pressable>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.sheet, sheetAnimationStyle]}>
              {showDecor && <View style={styles.decor} />}
              <View style={contentStyles.wrapper}>
                {!!title && <Typography weight="500">{title}</Typography>}
                {children}
              </View>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: SPACING.MINI,
    right: SPACING.MINI,

    paddingTop: SPACING.MINI,
    borderTopRightRadius: SPACING.DEFAULT,
    borderTopLeftRadius: SPACING.DEFAULT,
    backgroundColor: lightTheme.main,
  },
  decor: {
    width: 48,
    height: 4,
    alignSelf: 'center',
    borderRadius: 2,
    backgroundColor: lightTheme.border,
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
