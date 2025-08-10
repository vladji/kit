import { FC, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import {
  TextInputComponent,
  TextInputComponentProps,
} from 'shared/ui/TextInput';

export interface TextInputActionProps extends TextInputComponentProps {
  inputValue: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
  Icon: ReactElement;
}

export const TextInputAction: FC<TextInputActionProps> = ({
  inputValue,
  onChangeText,
  onPress,
  Icon,
  ...inputProps
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInputComponent
          {...inputProps}
          value={inputValue}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {Icon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: SPACING.MEDIUM,
  },
  inputWrapper: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    height: '100%',
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: ComponentSize.ButtonBorderRadius,
    borderColor: 'transparent',
    backgroundColor: lightTheme.brand,
  },
});
