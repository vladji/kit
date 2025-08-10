import { FormattedMessage } from 'react-intl';
import { AdminChatTabs } from 'app/router/Tabs/AdminChatTabs.tsx';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const AdminView = () => {
  return (
    <ScreenLayout
      headerContent={<FormattedMessage defaultMessage="Список чатов" />}
    >
      <AdminChatTabs />
    </ScreenLayout>
  );
};
