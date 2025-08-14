import { useEffect } from 'react';
import { connectSocket } from 'app/providers/Socket/socket.ts';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useCurrentUser } from 'entities/user/model/useCurrentUser.ts';

export const useSocketConnect = () => {
  const token = usePersistentStore((store) => store.token);
  const { userId } = useCurrentUser();

  useEffect(() => {
    if (userId) {
      connectSocket(userId, token);
    }
  }, [token, userId]);
};
