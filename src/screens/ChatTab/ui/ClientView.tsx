import { FormattedMessage } from 'react-intl';
import { useMemberAllChats } from 'entities/chat/model/useMemberAllChats.ts';
import { ChatsList } from 'shared/ui/ChatsList';
import { ScreenLayout } from 'shared/ui/ScreenLayout';

export const ClientView = () => {
  const { loading, refetch, data } = useMemberAllChats();

  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Список чатов" />}
    >
      <ChatsList loading={loading} refetch={refetch} chats={data?.chats} />
    </ScreenLayout>
  );
};
