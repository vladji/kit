import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouter, RootRouterParams } from 'app/router/RootRouter/types.ts';
import { CHAT_SUPPORT } from 'entities/chat/model/constants.ts';
import { ChatMemberProps } from 'entities/chat/model/types.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { MenuButton } from 'shared/ui/MenuButton';

export const Contacts = () => {
  const { navigate } = useNavigation<NavigationProp<RootRouterParams>>();

  const admin: ChatMemberProps = {
    id: CHAT_SUPPORT,
    role: UserRoles.Admin,
    name: 'Admin',
    avatarUrl: null,
  };

  const onSupportPress = () => {
    navigate(RootRouter.PrivateChatRoute, { to: admin });
  };

  return (
    <MenuButton onPress={onSupportPress} noBorder>
      <FormattedMessage defaultMessage="Чат с поддержкой" />
    </MenuButton>
  );
};
