import { FC, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TRANSPARENT } from 'shared/styles/constants/colors.ts';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
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
  const { colors } = useStyles();

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInputComponent
          {...inputProps}
          value={inputValue}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, colors().brand]}
        onPress={onPress}
      >
        {Icon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: Sizes.Medium,
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
    borderColor: TRANSPARENT,
  },
});
