import { FC, ReactElement, useState } from 'react';
import { Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import {
  TextInputComponent,
  TextInputComponentProps,
} from 'shared/ui/TextInput';

interface Props extends TextInputComponentProps {
  label: string | ReactElement;
}

export const PasswordInput: FC<Props> = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const PasswordButton = (
    <Pressable onPress={togglePassword} hitSlop={4}>
      {showPassword ? <EyeOff strokeWidth={1} /> : <Eye strokeWidth={1} />}
    </Pressable>
  );

  return (
    <TextInputComponent
      {...props}
      label={label}
      secureTextEntry={!showPassword}
      endAdornment={PasswordButton}
    />
  );
};
