import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { LucideProps } from 'lucide-react-native';
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
  Icon: FC<LucideProps>;
  chatting?: boolean;
}

export const TextInputAction: FC<TextInputActionProps> = ({
  inputValue,
  onChangeText,
  onPress,
  Icon,
  chatting = false,
  ...inputProps
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInputComponent
          {...inputProps}
          value={inputValue}
          onChangeText={onChangeText}
          chatting={chatting}
        />
      </View>
      <TouchableOpacity
        style={chatting ? styles.roundedButton : styles.button}
        onPress={onPress}
      >
        <Icon color={lightTheme.main} size={16} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: SPACING.MINI_S,
  },
  inputWrapper: {
    flex: 1,
  },
  button: {
    height: 'auto',
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ComponentSize.ButtonBorderRadius,
    backgroundColor: lightTheme.brand,
  },
  roundedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ComponentSize.InputSizeS,
    width: ComponentSize.InputSizeS,
    borderRadius: 888,
    backgroundColor: lightTheme.brand,
  },
});
