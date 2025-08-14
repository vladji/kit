import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { AdminView } from 'screens/ChatTab/ui/AdminView.tsx';
import { ClientView } from 'screens/ChatTab/ui/ClientView.tsx';

export const ChatTab = () => {
  const { anyAdmin } = useIsAdmin();
  if (anyAdmin) {
    return <AdminView />;
  }
  return <ClientView />;
};
