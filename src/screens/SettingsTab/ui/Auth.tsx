import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouter, RootStackParams } from 'app/router/RootRouter/types.ts';
import { Login } from 'features/Login';
import { Logout } from 'features/Logout';
import { useIsAdmin } from 'shared/hooks/useIsAdmin.ts';
import { MenuButton } from 'shared/ui/MenuButton';

export const SettingsAuth = () => {
  const { anyAdmin } = useIsAdmin();
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleShowLogin = useCallback(() => {
    setShowLoginModal((prev) => !prev);
  }, []);

  const onCreateStorePress = () => {
    navigate(RootRouter.CreateStoreRoute);
  };

  const showLogin = !anyAdmin;
  const showRegisterBusiness = !anyAdmin;

  const showLogout = anyAdmin;

  return (
    <>
      <View>
        {showLogin && (
          <MenuButton onPress={toggleShowLogin}>
            <FormattedMessage defaultMessage="Войти" />
          </MenuButton>
        )}
        {showRegisterBusiness && (
          <MenuButton onPress={onCreateStorePress} noBorder>
            <FormattedMessage defaultMessage="Зарегистрировать бизнес" />
          </MenuButton>
        )}
        {showLogout && <Logout />}
      </View>
      <Login show={showLoginModal} onClose={toggleShowLogin} />
    </>
  );
};
