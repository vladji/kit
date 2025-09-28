import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { safeSocket } from 'app/providers/Socket/socket.ts';

export const useChatUpdated = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const invalidateChatsQuery = () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_CHATS],
      });
    };

    safeSocket()?.on('chat_updated', invalidateChatsQuery);

    return () => {
      safeSocket()?.off('chat_updated', invalidateChatsQuery);
    };
  }, [queryClient]);
};
