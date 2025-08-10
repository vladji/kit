import { FC } from 'react';
import { LogOut } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { logout } from 'shared/lib/auth/logout.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { MenuButton } from 'shared/ui/MenuButton';

interface Props {
  isAdmin?: boolean;
}

export const Logout: FC<Props> = () => {
  const onPress = () => {
    logout();
  };

  return (
    <MenuButton
      onPress={onPress}
      textColor={lightThemeText.alert}
      StartIcon={LogOut}
    >
      <FormattedMessage defaultMessage="Выйти из аккаунта" />
    </MenuButton>
  );
};
