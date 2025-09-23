import { Dispatch, RefObject, SetStateAction, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { MessageProps } from 'entities/chat/model/types.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  chatId: string | null;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  metaRef: RefObject<MetaRefProps>;
  latestMessages?: MessageProps[];
}

export const usePastLatestMessage = ({
  chatId,
  setMessages,
  metaRef,
  latestMessages,
}: Props) => {
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_LATEST_MESSAGES, chatId],
        });
      }
    },
    [chatId, latestMessages, setMessages, metaRef, queryClient],
  );
};
