import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouter, RootStackParams } from 'app/router/RootRouter/types.ts';
import { CHAT_SUPPORT } from 'entities/chat/model/constants.ts';
import { ChatMemberProps } from 'entities/chat/model/types.ts';
import { useMemberAllChats } from 'entities/chat/model/useMemberAllChats.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { MenuButton } from 'shared/ui/MenuButton';

export const Contacts = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();
  const { data, loading } = useMemberAllChats(true);

  const admin: ChatMemberProps = {
    id: CHAT_SUPPORT,
    role: UserRoles.Admin,
    name: 'Admin',
    avatarUrl: null,
  };

  const onSupportPress = async () => {
    let supportChatId: string | null = null;
    if (data?.chats.length) {
      supportChatId = data.chats[0].chatId;
    }
    navigate(RootRouter.PrivateChatRoute, { to: admin, chatId: supportChatId });
  };

  return (
    <MenuButton onPress={onSupportPress} disabled={loading} noBorder>
      <FormattedMessage defaultMessage="Чат с поддержкой" />
    </MenuButton>
  );
};
