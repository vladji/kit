import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouter, RootStackParams } from 'app/router/RootRouter/types.ts';
import { DEFAULT_ADMIN } from 'entities/admin/model/constants.ts';
import { useMemberAllChats } from 'entities/chat/model/useMemberAllChats.ts';
import { MenuButton } from 'shared/ui/MenuButton';

export const Contacts = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();
  const { data, loading } = useMemberAllChats(true);

  const onSupportPress = async () => {
    let supportChatId: string | null = null;
    if (data?.chats.length) {
      supportChatId = data.chats[0].chatId;
    }
    navigate(RootRouter.PrivateChatRoute, {
      peer: DEFAULT_ADMIN,
      chatId: supportChatId,
      chatSupport: true,
    });
  };

  return (
    <MenuButton onPress={onSupportPress} disabled={loading} noBorder>
      <FormattedMessage defaultMessage="Чат с поддержкой" />
    </MenuButton>
  );
};
