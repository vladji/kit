import { FC, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TRANSPARENT } from 'shared/styles/constants/colors.ts';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import {
  TextInputComponent,
  TextInputComponentProps,
} from 'shared/ui/TextInput';

interface Props extends TextInputComponentProps {
  inputValue: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
  Icon: ReactElement;
}

export const TextInputAction: FC<Props> = ({
  inputValue,
  onChangeText,
  onPress,
  Icon,
}) => {
  const { colors } = useStyles();

  return (
    <View style={styles.wrapper}>
      <TextInputComponent value={inputValue} onChangeText={onChangeText} />
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
