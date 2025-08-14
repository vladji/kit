import { FC, ReactElement } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  useColorScheme,
} from 'react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

export interface TextInputComponentProps extends TextInputProps {
  label?: ReactElement | string;
  startAdornment?: ReactElement;
  endAdornment?: ReactElement;
}

export const TextInputComponent: FC<TextInputComponentProps> = ({
  label,
  startAdornment,
  endAdornment,
  ...props
}) => {
  const theme = useColorScheme();
  const isLight = theme === 'light';
  return (
    <View style={styles.wrapper}>
      {!!label && (
        <View style={styles.label}>
          <Typography type="label">{label}</Typography>
        </View>
      )}
      {!!startAdornment && startAdornment}
      <TextInput
        {...props}
        style={styles.input}
        keyboardAppearance={isLight ? 'light' : 'dark'}
      />
      {!!endAdornment && endAdornment}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MICRO,
    paddingHorizontal: SPACING.MINI,
    borderWidth: 1,
    borderRadius: ComponentSize.ButtonBorderRadius,
    borderColor: lightTheme.border,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 12,
    transform: [{ translateY: '-55%' }],
    paddingHorizontal: SPACING.MICRO,
    backgroundColor: lightTheme.main,
  },
  input: {
    flex: 1,
    height: ComponentSize.InputSize,
    fontSize: 16,
  },
});
