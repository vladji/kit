import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { House, Send, Settings } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { BottomTabs } from 'app/router/BottomTabs/types.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { TabButton } from 'widgets/BottomNavBar/TabButton.tsx';

export const BottomNavBar: FC<BottomTabBarProps> = ({ navigation, state }) => {
  const onPress = (route: BottomTabs) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.wrapper}>
      <TabButton
        onPress={() => onPress(BottomTabs.Home)}
        Icon={House}
        text={<FormattedMessage defaultMessage="Главная" />}
        active={state.index === 0}
      />
      <TabButton
        onPress={() => onPress(BottomTabs.Chat)}
        Icon={Send}
        text={<FormattedMessage defaultMessage="Чаты" />}
        active={state.index === 1}
      />
      <TabButton
        onPress={() => onPress(BottomTabs.Settings)}
        Icon={Settings}
        text={<FormattedMessage defaultMessage="Настройки" />}
        active={state.index === 2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: SPACING.BIG,
    height: ComponentSize.BottomNavBarSize,
    paddingHorizontal: ComponentSize.ScreenPaddingHorizontal,
    paddingBottom: 18,
    backgroundColor: lightTheme.main,
  },
});
