import { FormattedMessage } from 'react-intl';
import { useMemberAllChats } from 'entities/chat/model/useMemberAllChats.ts';
import { ChatsList } from 'shared/ui/ChatsList';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const ClientView = () => {
  const { loading, refetch, data } = useMemberAllChats();

  return (
    <ScreenLayout
      headerContent={<FormattedMessage defaultMessage="Список чатов" />}
    >
      <ChatsList loading={loading} refetch={refetch} chats={data?.chats} />
    </ScreenLayout>
  );
};
