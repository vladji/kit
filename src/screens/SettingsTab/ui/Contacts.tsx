import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { CHAT_SUPPORT } from 'app/config/constants.ts';
import { RootRouter, RootRouterParams } from 'app/router/RootRouter/types.ts';
import { MenuButton } from 'shared/ui/MenuButton';

export const Contacts = () => {
  const { navigate } = useNavigation<NavigationProp<RootRouterParams>>();

  const onSupportPress = () => {
    navigate(RootRouter.PrivateChatRoute, { to: CHAT_SUPPORT });
  };

  return (
    <MenuButton onPress={onSupportPress} noBorder>
      <FormattedMessage defaultMessage="Чат с поддержкой" />
    </MenuButton>
  );
};
