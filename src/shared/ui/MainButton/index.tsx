import { FC, useMemo } from 'react';
import {
  StyleSheet,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

type ButtonVariants = 'default' | 'outline';

type VariantsType = {
  button: Record<ButtonVariants, TouchableOpacityProps['style']>;
  typography: Record<ButtonVariants, TextProps['style']>;
};

interface Props extends TouchableOpacityProps {
  variant?: ButtonVariants;
}

export const MainButton: FC<Props> = ({
  variant = 'default',
  style,
  children,
  ...props
}) => {
  const { colors, fontColors } = useStyles();

  const variants = useMemo<VariantsType>(
    () => ({
      button: {
        default: { ...colors().brand },
        outline: {
          borderWidth: 1,
          ...colors('borderColor').border,
          backgroundColor: 'transparent',
        },
      },
      typography: {
        default: { ...fontColors.light },
        outline: { ...fontColors.main },
      },
    }),
    [colors, fontColors],
  );

  const buttonVariant = variants.button[variant];
  const typographyVariant = variants.typography[variant];

  return (
    <TouchableOpacity style={[styles.wrapper, buttonVariant, style]} {...props}>
      <Typography type="title" style={typographyVariant}>
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
