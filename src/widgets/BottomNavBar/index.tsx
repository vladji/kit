import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { House, User } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { BottomTabs } from 'app/router/BottomTabs/types.ts';
import { ComponentSize } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { TabButton } from 'widgets/BottomNavBar/TabButton.tsx';

export const BottomNavBar: FC<BottomTabBarProps> = ({ navigation, state }) => {
  const { colors } = useStyles();
  const onPress = (route: BottomTabs) => {
    navigation.navigate(route);
  };

  return (
    <View style={[styles.wrapper, colors('backgroundColor').main]}>
      <TabButton
        onPress={() => onPress(BottomTabs.Restaurants)}
        Icon={House}
        text={<FormattedMessage defaultMessage="Главная" />}
        active={state.index === 0}
      />
      <TabButton
        onPress={() => onPress(BottomTabs.Settings)}
        Icon={User}
        text={<FormattedMessage defaultMessage="Профиль" />}
        active={state.index === 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: ComponentSize.BottomNavBarHeight,
    paddingHorizontal: ComponentSize.ScreenPaddingHorizontal,
  },
});
