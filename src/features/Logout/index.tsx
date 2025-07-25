import { FC } from 'react';
import { LogOut } from 'lucide-react-native';
import { FormattedMessage } from 'react-intl';
import { logout } from 'shared/lib/auth/logout.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { MenuButton } from 'shared/ui/MenuButton';

interface Props {
  isAdmin?: boolean;
}

export const Logout: FC<Props> = () => {
  const { fontColors } = useStyles();

  const onPress = () => {
    logout();
  };

  return (
    <MenuButton
      onPress={onPress}
      textColor={fontColors.alert}
      StartIcon={LogOut}
    >
      <FormattedMessage defaultMessage="Выйти из аккаунта" />
    </MenuButton>
  );
};
