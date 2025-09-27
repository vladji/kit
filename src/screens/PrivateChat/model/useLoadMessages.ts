import { useFetchLatestMessages } from 'entities/chat/api/useFetchLatestMessages.ts';
import { useFetchRecentlyMessages } from 'entities/chat/api/useFetchRecentlyMessages.ts';
import { ChatMemberProps } from 'entities/chat/model/types.ts';

interface Props {
  chatId: string | null;
  selfProfile: ChatMemberProps | null;
}

export const useLoadMessages = ({ chatId, selfProfile }: Props) => {
  const { latestMessages } = useFetchLatestMessages({ chatId });
  const { recentlyMessages } = useFetchRecentlyMessages({
    chatId,
    readerId: selfProfile?.id || null,
  });

  return {
    latestMessages,
    recentlyMessages,
  };
};
