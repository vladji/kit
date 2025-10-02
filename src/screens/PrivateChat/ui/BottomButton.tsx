import {
  Dispatch,
  RefObject,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { CounterBadge } from 'entities/chat/ui/CounterBadge.tsx';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';
import { ANIMATION_DURATION_COMMON } from 'shared/styles/tokens/animation.ts';
import { COLORS } from 'shared/styles/tokens/colors.ts';

interface Props {
  show: boolean;
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
  metaRef: RefObject<MetaRefProps>;
  chatId: string | null;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  messages: MessageProps[];
  unreadCounter: number;
}

export const BottomButton = memo(
  ({
    show,
    listRef,
    metaRef,
    chatId,
    setMessages,
    messages,
    unreadCounter,
  }: Props) => {
    const { latestMessages } = useFetchLatestMessages({ chatId });

    const onPress = () => {
      const lastMessageId = messages.at(-1)?.id;
      const latestMessageId = latestMessages?.at(-1)?.id;

      if (lastMessageId !== latestMessageId && latestMessages) {
        setMessages(latestMessages);
      }

      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd({ animated: true });
      });
    };

    const scale = useSharedValue(0);

    const animation = useCallback(
      (value: number) => {
        scale.value = withSpring(value, {
          duration: ANIMATION_DURATION_COMMON,
        });
      },
      [scale],
    );

    useEffect(() => {
      const value = show ? 1 : 0;
      animation(value);
    }, [show, animation]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const iconStyle = useAnimatedStyle(() => {
      const iconOpacity = interpolate(scale.value, [0, 1], [0, 1]);
      return {
        opacity: iconOpacity,
      };
    });

    return (
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        {!!unreadCounter && (
          <View style={styles.counter}>
            <CounterBadge counter={unreadCounter} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={onPress}>
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
    bottom: 58,
    right: 12,
  },
  counter: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    zIndex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
    borderRadius: 111,
    backgroundColor: 'rgba(173,201,130,0.59)',
  },
});
