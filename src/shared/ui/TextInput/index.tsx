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
  chatting?: boolean;
}

export const TextInputComponent: FC<TextInputComponentProps> = ({
  label,
  startAdornment,
  endAdornment,
  chatting = false,
  ...props
}) => {
  const theme = useColorScheme();
  const isLight = theme === 'light';
  return (
    <View
      style={[
        styles.wrapper,
        chatting ? styles.wrapperChatting : styles.wrapperBase,
      ]}
    >
      {!!label && (
        <View style={styles.label}>
          <Typography type="label">{label}</Typography>
        </View>
      )}
      {!!startAdornment && startAdornment}
      <TextInput
        {...props}
        style={[
          styles.input,
          chatting ? styles.inputChatting : styles.inputBase,
        ]}
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
    paddingHorizontal: 10,
    backgroundColor: lightTheme.input,
  },
  wrapperBase: {
    borderRadius: ComponentSize.ButtonBorderRadius,
  },
  wrapperChatting: {
    borderRadius: 24,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 8,
    transform: [{ translateY: '-55%' }],
    paddingHorizontal: SPACING.MICRO,
    backgroundColor: lightTheme.main,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputBase: {
    height: ComponentSize.InputSize,
  },
  inputChatting: {
    height: ComponentSize.InputSizeS,
  },
});
