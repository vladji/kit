import { useFetchAllClientChats } from 'entities/admin/api/useFetchAllClientChats.ts';
import { ChatsList } from 'entities/chat/ui/ChatsList.tsx';

export const AdminClientsTab = () => {
  const { isLoading, data } = useFetchAllClientChats();
  return <ChatsList loading={isLoading} chats={data?.chats} />;
};
