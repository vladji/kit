import { useEffect } from 'react';
import { connectSocket } from 'app/providers/Socket/socket.ts';
import { useChatUser } from 'entities/Chat/model/useChatUser.ts';

export const useSocketConnect = () => {
  const { userId } = useChatUser();

  useEffect(() => {
    if (userId) {
      connectSocket(userId);
    }
  }, [userId]);
};
