import { FC, ReactElement } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';

export interface TextInputComponentProps extends TextInputProps {
  startAdornment?: ReactElement;
}

export const TextInputComponent: FC<TextInputComponentProps> = ({
  startAdornment,
  ...props
}) => {
  const { colors } = useStyles();

  return (
    <View style={[styles.wrapper, colors('borderColor').border]}>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: Sizes.Micro,
    paddingHorizontal: Sizes.Mini,
    borderWidth: 1,
    borderRadius: ComponentSize.ButtonBorderRadius,
  },
  input: {
    height: ComponentSize.InputSize,
    fontSize: 16,
  },
});
