import { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { AppContext } from 'app/appContext';
import { RootRouter, RootRouterParams } from 'app/router/RootRouter/types.ts';
import { Login } from 'features/Login';
import { Logout } from 'features/Logout';
import { MenuButton } from 'shared/ui/MenuButton';

export const SettingsAuth = () => {
  const { navigate } = useNavigation<NavigationProp<RootRouterParams>>();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleShowLogin = useCallback(() => {
    setShowLoginModal((prev) => !prev);
  }, []);

  const { admin, rootAdmin } = useContext(AppContext);
  const anyAdmin = rootAdmin || admin;

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
