import { FC, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { usePostAdminLogin } from 'features/AdminLogin/api/usePostAdminLogin.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { BottomSheet } from 'shared/ui/BottomSheet';
import { MainButton } from 'shared/ui/MainButton';
import { PasswordInput } from 'shared/ui/PasswordInput';
import { TextInputComponent } from 'shared/ui/TextInput';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const AdminLogin: FC<Props> = ({ show, onClose }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { postAdminLogin, loading } = usePostAdminLogin();

  const onSubmit = async () => {
    if (name && password) {
      await postAdminLogin({ uniqId: name, password });
      onClose();
      Keyboard.dismiss();
    }
  };

  return (
    <BottomSheet
      show={show}
      onClose={onClose}
      title="Admin login"
      loading={loading}
    >
      <View style={styles.wrapper}>
        <TextInputComponent label="Name" onChangeText={setName} />
        <PasswordInput label="Password" onChangeText={setPassword} />
        <MainButton onPress={onSubmit}>Login</MainButton>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.DEFAULT,
  },
});
