import { useEffect } from 'react';
import { QueryObserverResult } from '@tanstack/react-query';
import { safeSocket } from 'app/providers/Socket/socket.ts';

interface Props<T> {
  refetch: () => Promise<QueryObserverResult<T>>;
}

export const useChatUpdated = <T>({ refetch }: Props<T>) => {
  useEffect(() => {
    safeSocket()?.on('chat_updated', refetch);
    return () => {
      safeSocket()?.off('chat_updated', refetch);
    };
  }, [refetch]);
};
