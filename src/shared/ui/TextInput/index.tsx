import { FC, ReactElement } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useIsLightTheme } from 'shared/styles/useIsLightTheme.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
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
  const isLight = useIsLightTheme();
  const { colors } = useStyles();

  return (
    <View style={[styles.wrapper, colors('borderColor').border]}>
      {!!label && (
        <View style={[styles.label, colors().main]}>
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
    gap: Sizes.Micro,
    paddingHorizontal: Sizes.Mini,
    borderWidth: 1,
    borderRadius: ComponentSize.ButtonBorderRadius,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 12,
    transform: [{ translateY: '-55%' }],
    paddingHorizontal: Sizes.Micro,
  },
  input: {
    flex: 1,
    height: ComponentSize.InputSize,
    fontSize: 16,
  },
});
