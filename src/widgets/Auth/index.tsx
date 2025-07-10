import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Login } from 'features/Login';
import { MenuButton } from 'shared/ui/MenuButton';

export const Auth = () => {
  const [showLogin, setShowLogin] = useState(false);
  const toggleShowLogin = useCallback(() => {
    setShowLogin((prev) => !prev);
  }, []);

  return (
    <>
      <View>
        <MenuButton onPress={toggleShowLogin}>
          <FormattedMessage defaultMessage="Войти" />
        </MenuButton>
        <MenuButton>
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
