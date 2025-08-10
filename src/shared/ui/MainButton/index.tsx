import { FC } from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

type ButtonVariants = 'default' | 'outline';

interface Props extends TouchableOpacityProps {
  variant?: ButtonVariants;
}

export const MainButton: FC<Props> = ({
  variant = 'default',
  style,
  children,
  ...props
}) => {
  const fontColor = fontColorVariants[variant];

  return (
    <TouchableOpacity
      {...props}
      style={[styles.wrapper, styles[variant], style]}
    >
      <Typography type="title" color={fontColor}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

const fontColorVariants: Record<ButtonVariants, ColorValue> = {
  default: lightThemeText.light,
  outline: lightThemeText.main,
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ComponentSize.MainButtonSize,
    paddingHorizontal: SPACING.MEDIUM,
    borderRadius: ComponentSize.ButtonBorderRadius,
  },
  default: {
    backgroundColor: lightTheme.brand,
  },
  outline: {
    borderWidth: 1,
    borderColor: lightTheme.border,
    backgroundColor: 'transparent',
  },
});
