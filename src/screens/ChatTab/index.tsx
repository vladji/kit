import { AdminView } from 'screens/ChatTab/ui/AdminView.tsx';
import { ClientView } from 'screens/ChatTab/ui/ClientView.tsx';
import { useIsAdmin } from 'shared/hooks/useIsAdmin.ts';

export const ChatTab = () => {
  const { anyAdmin } = useIsAdmin();

  if (anyAdmin) {
    return <AdminView />;
  }

  return <ClientView />;
};
