import { Dispatch, RefObject, SetStateAction, useCallback } from 'react';
import { useFetchLatestMessages } from 'entities/chat/api/useFetchLatestMessages.ts';
import { MessageProps } from 'entities/chat/model/types.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  chatId: string | null;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  metaRef: RefObject<MetaRefProps>;
}

export const usePastLatestMessage = ({
  chatId,
  setMessages,
  metaRef,
}: Props) => {
  const { latestMessages, refetch } = useFetchLatestMessages({ chatId });

  return useCallback(
    (lastMessage: MessageProps) => {
      if (latestMessages?.length) {
        setMessages((prev) => {
          const latestLast = latestMessages.at(-1);
          const prevLast = prev.at(-1);

          if (latestLast?.id === prevLast?.id) {
            return [...prev, lastMessage];
          }
          return [...latestMessages, lastMessage];
        });

        metaRef.current.shouldScrollToBottom = true;
        setTimeout(() => refetch());
      }
    },
    [latestMessages, setMessages, metaRef, refetch],
  );
};
