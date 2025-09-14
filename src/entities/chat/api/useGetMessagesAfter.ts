import { Dispatch, SetStateAction, TransitionStartFunction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import {
  Direction,
  MESSAGES_DEFAULT_LIMIT,
} from 'entities/chat/model/constants.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.tsx';
import { getMessageAtIndex } from 'entities/chat/utils/getChatItemAtIndex.ts';

interface Props {
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransition: TransitionStartFunction;
}

export const useGetMessagesAfter = ({
  setMessages,
  startTransition,
}: Props) => {
  const formatList = useFormatListMessages();

  return useMutation<
    MessageProps[],
    unknown,
    Omit<GetMessagesRequest, 'limit' | 'direction'>
  >({
    mutationFn: ({ chatId, messageId }) =>
      getMessages({
        chatId,
        messageId,
        direction: Direction.After,
        limit: MESSAGES_DEFAULT_LIMIT,
      }),
    onSuccess: (messages) => {
      if (messages?.length) {
        let list = formatList(messages);

        startTransition(() => {
          setMessages((prev) => {
            if (prev.length > 150) {
              const { index } = getMessageAtIndex(99, prev);
              const trimmedPrev = prev.slice(index);
              return [...new Set([...trimmedPrev, ...list])];
            }

            return [...new Set([...prev, ...list])];
          });
        });
      }
    },
  });
};
