import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouter, RootRouterParams } from 'app/router/RootRouter/types.ts';
import { Login } from 'features/Login';
import { MenuButton } from 'shared/ui/MenuButton';

export const SettingsAuth = () => {
  const { navigate } = useNavigation<NavigationProp<RootRouterParams>>();
  const [showLogin, setShowLogin] = useState(false);
  const toggleShowLogin = useCallback(() => {
    setShowLogin((prev) => !prev);
  }, []);

  const onCreateStorePress = () => {
    navigate(RootRouter.CreateStoreRoute);
  };

  return (
    <>
      <View>
        <MenuButton onPress={toggleShowLogin}>
          <FormattedMessage defaultMessage="Войти" />
        </MenuButton>
        <MenuButton onPress={onCreateStorePress} noBorder>
          <FormattedMessage defaultMessage="Зарегистрировать бизнес" />
        </MenuButton>
      </View>
      <Login show={showLogin} onClose={toggleShowLogin} />
    </>
  );
};
