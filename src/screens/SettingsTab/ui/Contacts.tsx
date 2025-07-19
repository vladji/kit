import { REACT_CHAT_ROOT_ADMIN } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouter, RootRouterParams } from 'app/router/RootRouter/types.ts';
import { MenuButton } from 'shared/ui/MenuButton';

export const Contacts = () => {
  const { navigate } = useNavigation<NavigationProp<RootRouterParams>>();

  const onSupportPress = () => {
    navigate(RootRouter.ChatRoute, { to: REACT_CHAT_ROOT_ADMIN });
  };

  return (
    <MenuButton onPress={onSupportPress} noBorder>
      <FormattedMessage defaultMessage="Чат с поддержкой" />
    </MenuButton>
  );
};
