import { useEffect } from 'react';
import { connectSocket } from 'app/providers/Socket/socket.ts';
import { useChatMember } from 'entities/Chat/model/useChatMember.ts';

export const useSocketConnect = () => {
  const { member } = useChatMember();

  useEffect(() => {
    if (member) {
      connectSocket(member);
    }
  }, [member]);
};
