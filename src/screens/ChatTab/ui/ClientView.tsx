import { FormattedMessage } from 'react-intl';
import { useMemberAllChats } from 'entities/chat/model/useMemberAllChats.ts';
import { ChatsList } from 'entities/chat/ui/ChatsList.tsx';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const ClientView = () => {
  const { loading, data } = useMemberAllChats();
  return (
    <ScreenLayout
      headerContent={<FormattedMessage defaultMessage="Список чатов" />}
    >
      <ChatsList loading={loading} chats={data?.chats} />
    </ScreenLayout>
  );
};
