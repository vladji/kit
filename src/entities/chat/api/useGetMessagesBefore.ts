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
import { useStartChatDate } from 'entities/chat/model/useStartChatDate.ts';

interface Props {
  messagesState: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransition: TransitionStartFunction;
}

export const useGetMessagesBefore = ({
  messagesState,
  setMessages,
  startTransition,
}: Props) => {
  const setStartChatDate = useStartChatDate({
    setMessages,
    startTransition,
  });
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
        direction: Direction.Before,
        limit: Math.round(MESSAGES_DEFAULT_LIMIT),
      }),
    onSuccess: (messages) => {
      if (messages?.length) {
        const list = formatList(messages);

        startTransition(() => {
          setMessages((prev) => {
            return [...list, ...prev];
          });
        });
      } else {
        setStartChatDate(messagesState);
      }
    },
  });
};
