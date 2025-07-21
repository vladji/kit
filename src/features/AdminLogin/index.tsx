import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { BottomSheet } from 'shared/ui/BottomSheet';
import { PasswordInput } from 'shared/ui/PasswordInput';
import { TextInputComponent } from 'shared/ui/TextInput';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const AdminLogin: FC<Props> = ({ show, onClose }) => {
  return (
    <BottomSheet show={show} onClose={onClose} title="Admin login">
      <View style={styles.wrapper}>
        <TextInputComponent label="Name" />
        <PasswordInput label="Password" />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: Sizes.Default,
  },
});
