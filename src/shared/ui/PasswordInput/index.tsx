import { FC, ReactElement, useState } from 'react';
import { Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { TextInputComponent } from 'shared/ui/TextInput';

interface Props {
  label: string | ReactElement;
}

export const PasswordInput: FC<Props> = ({ label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const PasswordButton = (
    <Pressable onPress={togglePassword} hitSlop={4}>
      {showPassword ? <EyeOff /> : <Eye />}
    </Pressable>
  );

  return (
    <TextInputComponent
      label={label}
      secureTextEntry={showPassword}
      endAdornment={PasswordButton}
    />
  );
};
