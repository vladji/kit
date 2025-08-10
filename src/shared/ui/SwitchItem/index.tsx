import { FC, ReactElement } from 'react';
import { StyleSheet, Switch, SwitchProps, View } from 'react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { Typography } from 'shared/ui/Typography';

interface Props extends SwitchProps {
  title: ReactElement | string;
}

export const SwitchItem: FC<Props> = ({ title, ...switchProps }) => {
  return (
    <View style={styles.wrapper}>
      <Typography>{title}</Typography>
      <Switch
        trackColor={{
          false: lightTheme.muted,
          true: lightTheme.brandLight,
        }}
        thumbColor={lightTheme.main}
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
