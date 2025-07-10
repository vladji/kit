import { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

export const MainButton: FC<TouchableOpacityProps> = ({
  style,
  children,
  ...props
}) => {
  const { colors, fontColors } = useStyles();

  return (
    <TouchableOpacity
      style={[styles.wrapper, colors().brand, style]}
      {...props}
    >
      <Typography type="title" color={fontColors.light}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ComponentSize.MainButtonHeight,
    paddingHorizontal: Sizes.Medium,
    borderRadius: ComponentSize.ButtonBorderRadius,
  },
});
