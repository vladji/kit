import { FormattedMessage } from 'react-intl';
import { AdminChatTabs } from 'app/router/Tabs/AdminChatTabs.tsx';
import { ScreenLayout } from 'shared/ui/ScreenLayout';

export const AdminView = () => {
  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Список чатов" />}
    >
      <AdminChatTabs />
    </ScreenLayout>
  );
};
