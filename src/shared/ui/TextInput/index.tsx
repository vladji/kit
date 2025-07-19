import { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';

export const TextInputComponent: FC<TextInputProps> = (props) => {
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
    paddingHorizontal: Sizes.Mini,
    borderWidth: 1,
    borderRadius: ComponentSize.ButtonBorderRadius,
  },
  input: {
    height: ComponentSize.MainButtonHeight,
    fontSize: 16,
  },
});
