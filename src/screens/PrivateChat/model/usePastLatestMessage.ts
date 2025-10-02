import {
  Dispatch,
  RefObject,
  SetStateAction,
  startTransition,
  useCallback,
} from 'react';
import { FlashListRef } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  chatId: string | null;
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
  metaRef: RefObject<MetaRefProps>;
  messages: MessageProps[];
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  latestMessages?: MessageProps[];
}

export const usePastLatestMessage = ({
  chatId,
  listRef,
  metaRef,
  messages,
  setMessages,
  latestMessages,
}: Props) => {
  const queryClient = useQueryClient();

  const pastSelfMessage = useCallback(
    async (message: MessageProps) => {
      if (latestMessages?.length) {
        setMessages((prev) => {
          const latestLast = latestMessages.at(-1);
          const prevLast = prev.at(-1);

          if (latestLast?.id === prevLast?.id) {
            return [...prev, message];
          }
          return [...latestMessages, message];
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_LATEST_MESSAGES, chatId],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_LATEST_MESSAGES, chatId],
        });

        if (latestMessages?.length) {
          startTransition(() => {
            setMessages(latestMessages);
          });
        }
      }

      // metaRef.current.shouldScrollToBottom = true - protection for guaranteed scrolling
      metaRef.current.shouldScrollToBottom = true;
      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd({ animated: true });
      });
    },
    [chatId, latestMessages, setMessages, queryClient, listRef, metaRef],
  );

  const pastPeerMessage = useCallback(
    (message: MessageProps) => {
      if (latestMessages?.length) {
        const latestLast = latestMessages.at(-1);
        const lastMessage = messages.at(-1);

        if (latestLast?.id === lastMessage?.id) {
          startTransition(() => {
            setMessages((prev) => [...prev, message]);
          });
        }

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_LATEST_MESSAGES, chatId],
        });
      }
    },
    [latestMessages, messages, setMessages, queryClient, chatId],
  );

  return {
    pastSelfMessage,
    pastPeerMessage,
  };
};
