import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouter, RootRouterProps } from 'app/router/RootRouter/types.ts';
import { Login } from 'features/Login';
import { MenuButton } from 'shared/ui/MenuButton';

export const SettingsAuth = () => {
  const { navigate } = useNavigation<NavigationProp<RootRouterProps>>();
  const [showLogin, setShowLogin] = useState(false);
  const toggleShowLogin = useCallback(() => {
    setShowLogin((prev) => !prev);
  }, []);

  const onCreateStore = () => {
    navigate(RootRouter.CreateStore);
  };

  return (
    <>
      <View>
        <MenuButton onPress={toggleShowLogin}>
          <FormattedMessage defaultMessage="Войти" />
        </MenuButton>
        <MenuButton onPress={onCreateStore}>
          <FormattedMessage defaultMessage="Зарегистрироваться как бизнес" />
        </MenuButton>
        <MenuButton noBorder>
          <FormattedMessage defaultMessage="Связаться с поддержкой" />
        </MenuButton>
      </View>
      <Login show={showLogin} onClose={toggleShowLogin} />
    </>
  );
};
