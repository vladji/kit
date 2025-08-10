import { useGetAllStoreChats } from 'entities/admin/api/useGetAllStoreChats.ts';
import { ChatsList } from 'shared/ui/ChatsList';

export const AdminStoresTab = () => {
  const { isLoading, refetch, data } = useGetAllStoreChats();

  return (
    <ChatsList loading={isLoading} refetch={refetch} chats={data?.chats} />
  );
};
