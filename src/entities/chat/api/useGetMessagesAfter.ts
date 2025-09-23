import { Dispatch, SetStateAction, startTransition } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import {
  Direction,
  MESSAGES_DEFAULT_LIMIT,
} from 'entities/chat/model/constants.ts';
import { MessageProps } from 'entities/chat/model/types.ts';

interface Props {
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
}

export const useGetMessagesAfter = ({ setMessages }: Props) => {
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
        startTransition(() => {
          setMessages((prev) => {
            return [...prev, ...messages];
          });
        });
      }
    },
  });
};
