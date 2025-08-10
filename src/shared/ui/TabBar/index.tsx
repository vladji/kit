import { memo, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { chatTabsNames } from 'app/router/Tabs/model/chatTabsNames.tsx';
import { TabsNames } from 'app/router/Tabs/types.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
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
          const tabName = chatTabsNames[route.name as TabsNames];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
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
              style={[
                styles.button,
                {
                  backgroundColor: isFocused
                    ? lightTheme.brandLight
                    : lightTheme.main,
                },
              ]}
              onPress={onPress}
            >
              <Typography
                type="title"
                color={isFocused ? lightThemeText.light : lightThemeText.main}
              >
                {tabName}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: SPACING.DEFAULT,
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: SPACING.DEFAULT,
  },
  button: {
    paddingHorizontal: SPACING.DEFAULT,
    paddingVertical: SPACING.MICRO,
    borderTopRightRadius: SPACING.MINI,
    borderTopLeftRadius: SPACING.MINI,
  },
});
