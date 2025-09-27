import { useFetchAllStoreChats } from 'entities/admin/api/useFetchAllStoreChats.ts';
import { ChatsList } from 'entities/chat/ui/ChatsList.tsx';

export const AdminStoresTab = () => {
  const { isLoading, data } = useFetchAllStoreChats();
  return <ChatsList loading={isLoading} chats={data?.chats} />;
};
