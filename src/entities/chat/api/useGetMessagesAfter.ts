import { Dispatch, SetStateAction, startTransition } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import {
  Direction,
  MESSAGES_DEFAULT_LIMIT,
} from 'entities/chat/model/constants.ts';
import { MessageProps } from 'entities/chat/model/types.ts';

export const useGetMessagesAfter = (
  setMessages?: Dispatch<SetStateAction<MessageProps[]>>,
) => {
  return useMutation<
    MessageProps[],
    unknown,
    Omit<GetMessagesRequest, 'direction' | 'readerId'>
  >({
    mutationFn: ({
      chatId,
      messageId,
      limit = MESSAGES_DEFAULT_LIMIT,
      includeCurrent = false,
    }) =>
      getMessages({
        chatId,
        messageId,
        readerId: null,
        direction: Direction.After,
        limit,
        includeCurrent,
      }),
    onSuccess: (messages) => {
      if (messages?.length && setMessages) {
        startTransition(() => {
          setMessages((prev) => {
            return [...prev, ...messages];
          });
        });
      }
    },
  });
};
