import { useFetchLatestMessages } from 'entities/chat/api/useFetchLatestMessages.ts';
import { useGetMessagesAround } from 'entities/chat/api/useFetchMessagesAround.ts';
import { ChatMemberProps } from 'entities/chat/model/types.ts';

interface Props {
  chatId: string | null;
  selfProfile: ChatMemberProps | null;
}

export const useLoadMessages = ({ chatId, selfProfile }: Props) => {
  const { latestMessages } = useFetchLatestMessages({ chatId });

  const { messagesAround } = useGetMessagesAround({
    chatId,
    readerId: selfProfile?.id || null,
  });

  return {
    latestMessages,
    messagesAround,
  };
};
