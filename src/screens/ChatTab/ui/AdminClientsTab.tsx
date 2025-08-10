import { useGetAllClientChats } from 'entities/admin/api/useGetAllClientChats.ts';
import { ChatsList } from 'entities/chat/ui/ChatsList.tsx';

export const AdminClientsTab = () => {
  const { isLoading, refetch, data } = useGetAllClientChats();

  return (
    <ChatsList loading={isLoading} refetch={refetch} chats={data?.chats} />
  );
};
