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
import { useStartChatDate } from 'entities/chat/model/useStartChatDate.tsx';
import { getMessageAtIndex } from 'entities/chat/utils/getChatItemAtIndex.ts';

interface Props {
  messagesState: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransition: TransitionStartFunction;
  isTransition: boolean;
}

export const useGetMessagesBefore = ({
  messagesState,
  setMessages,
  startTransition,
  isTransition,
}: Props) => {
  const setStartChatDate = useStartChatDate({
    messages: messagesState,
    setMessages,
    startTransition,
    isTransition,
  });
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
        direction: Direction.Before,
        limit: MESSAGES_DEFAULT_LIMIT,
      }),
    onSuccess: (messages) => {
      if (messages?.length) {
        const list = formatList(messages);
        if (!isTransition) {
          startTransition(() => {
            setMessages((prev) => {
              if (prev.length > 150) {
                const trimIndex = prev.length - 150;
                const { index } = getMessageAtIndex(trimIndex, prev);
                const chunk = prev.slice(index);
                return [...chunk, ...list];
              }
              return [...prev, ...list];
            });
          });
        }
      } else {
        setStartChatDate();
      }
    },
  });
};
