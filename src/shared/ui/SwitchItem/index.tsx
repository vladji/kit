import { FC, ReactElement } from 'react';
import { StyleSheet, Switch, SwitchProps, View } from 'react-native';
import {
  BRAND_LIGHT,
  LIGHT_COLOR,
  MUTED_DARK_THEME,
  MUTED_LIGHT_THEME,
} from 'shared/styles/constants/colors.ts';
import { useIsLightTheme } from 'shared/styles/useIsLightTheme.ts';
import { Typography } from 'shared/ui/Typography';

interface Props extends SwitchProps {
  title: ReactElement | string;
}

export const SwitchItem: FC<Props> = ({ title, ...switchProps }) => {
  const isLight = useIsLightTheme();

  return (
    <View style={styles.wrapper}>
      <Typography>{title}</Typography>
      <Switch
        trackColor={{
          false: isLight ? MUTED_LIGHT_THEME : MUTED_DARK_THEME,
          true: BRAND_LIGHT,
        }}
        thumbColor={LIGHT_COLOR}
        {...switchProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
