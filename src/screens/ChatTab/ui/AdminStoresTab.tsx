import { useGetAllStoreChats } from 'entities/admin/api/useGetAllStoreChats.ts';
import { ChatsList } from 'entities/chat/ui/ChatsList.tsx';

export const AdminStoresTab = () => {
  const { isLoading, refetch, data } = useGetAllStoreChats();

  return (
    <ChatsList loading={isLoading} refetch={refetch} chats={data?.chats} />
  );
};
