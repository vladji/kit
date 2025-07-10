import { FC, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SHADOW } from 'shared/styles/constants/colors.ts';
import { ComponentSize } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  title: ReactElement;
}

export const ScreenHeader: FC<Props> = ({ title }) => {
  const { colors } = useStyles();
  return (
    <View style={[styles.wrapper, colors('backgroundColor').main]}>
      <Typography type="title">{title}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ComponentSize.HeaderHeight,
    paddingHorizontal: ComponentSize.ScreenPaddingHorizontal,
    zIndex: 2,
    ...SHADOW,
  },
});
