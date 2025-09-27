import {
  Dispatch,
  RefObject,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FlashListRef } from '@shopify/flash-list';
import { ChevronDown } from 'lucide-react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useFetchLatestMessages } from 'entities/chat/api/useFetchLatestMessages.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { ANIMATION_DURATION_COMMON } from 'shared/styles/tokens/animation.ts';
import { COLORS } from 'shared/styles/tokens/colors.ts';

interface Props {
  show: boolean;
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  chatId: string | null;
}

export const BottomButton = memo(
  ({ show, listRef, setMessages, chatId }: Props) => {
    const { latestMessages } = useFetchLatestMessages({ chatId });

    const size = useSharedValue(0);

    const animation = useCallback(
      (value: number) => {
        size.value = withSpring(value, {
          duration: ANIMATION_DURATION_COMMON,
        });
      },
      [size],
    );

    useEffect(() => {
      const value = show ? 38 : 0;
      animation(value);
    }, [show, animation]);

    const onPress = () => {
      setImmediate(() => {
        listRef.current?.scrollToEnd({ animated: true });
      });
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        width: size.value,
        height: size.value,
      };
    });

    const iconStyle = useAnimatedStyle(() => {
      const iconOpacity = interpolate(size.value, [0, 39], [0, 1]);
      return {
        opacity: iconOpacity,
      };
    });

    return (
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View style={iconStyle}>
            <ChevronDown color={COLORS.DARK} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 52,
    right: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 111,
    backgroundColor: COLORS.ACCENT_LIGHT,
  },
});
