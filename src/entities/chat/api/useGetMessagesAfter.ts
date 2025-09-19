import { Dispatch, SetStateAction, TransitionStartFunction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import {
  Direction,
  MESSAGES_DEFAULT_LIMIT,
} from 'entities/chat/model/constants.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';

interface Props {
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransitionMessages: TransitionStartFunction;
}

export const useGetMessagesAfter = ({
  setMessages,
  startTransitionMessages,
}: Props) => {
  const formatList = useFormatListMessages();

  return useMutation<
    MessageProps[],
    unknown,
    Omit<GetMessagesRequest, 'limit' | 'direction' | 'readerId'>
  >({
    mutationFn: ({ chatId, messageId }) =>
      getMessages({
        chatId,
        messageId,
        readerId: null,
        direction: Direction.After,
        limit: MESSAGES_DEFAULT_LIMIT,
      }),
    onSuccess: (messages) => {
      if (messages?.length) {
        let list = formatList(messages);

        startTransitionMessages(() => {
          setMessages((prev) => {
            return [...prev, ...list];
          });
        });
      }
    },
  });
};
