import { memo, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { TabsNames } from 'app/router/Tabs/types.ts';
import {
  BRAND_COLOR,
  BRAND_LIGHT,
  LIGHT_COLOR,
  TRANSPARENT,
} from 'shared/styles/constants/colors.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { Typography } from 'shared/ui/Typography';

export const TabBar = memo(({ state, navigation }: MaterialTopTabBarProps) => {
  const { width: screenWidth } = useSafeAreaFrame();
  const scrollRef = useRef<ScrollView>(null);
  const buttonsRef = useRef<Map<number, View>>(new Map()).current;
  const scrollData = useRef({ offset: 0 }).current;
  const currentIndex = state.index;

  useEffect(() => {
    const button = buttonsRef.get(currentIndex);
    button?.measure(
      (fx: any, fy: any, width: number, height: any, px: number) => {
        const shift = px + width / 2;
        const halfScreen = screenWidth / 2;
        const scrollPosition = scrollData.offset - (halfScreen - shift);
        scrollRef?.current?.scrollTo({ x: scrollPosition, animated: true });
      },
    );
  }, [currentIndex, buttonsRef, screenWidth, scrollData]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={4}
        onScroll={(event) => {
          scrollData.offset = event.nativeEvent.contentOffset.x;
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabName = route.name as TabsNames;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tabName, route.params);
            }
          };

          return (
            <TouchableOpacity
              ref={(ref: View) => {
                if (!buttonsRef.has(index)) {
                  buttonsRef.set(index, ref);
                }
              }}
              key={route.key}
              style={{
                ...styles.button,
                backgroundColor: isFocused ? BRAND_LIGHT : LIGHT_COLOR,
                borderBottomWidth: isFocused ? 2 : 0,
                borderBottomColor: isFocused ? BRAND_COLOR : TRANSPARENT,
                borderBottomLeftRadius: isFocused ? 0 : Sizes.Mini,
                borderBottomRightRadius: isFocused ? 0 : Sizes.Mini,
              }}
              onPress={onPress}
            >
              <Typography>{tabName}</Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: Sizes.Default,
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: Sizes.Default,
  },
  button: {
    paddingHorizontal: Sizes.Default,
    paddingVertical: Sizes.Micro,
    borderTopRightRadius: Sizes.Mini,
    borderTopLeftRadius: Sizes.Mini,
  },
});
