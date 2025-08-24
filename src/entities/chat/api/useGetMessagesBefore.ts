import { Dispatch, SetStateAction, TransitionStartFunction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.tsx';
import { useStartChatDate } from 'entities/chat/model/useStartChatDate.tsx';

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
    Omit<GetMessagesRequest, 'limit'>
  >({
    mutationFn: ({ chatId, messageId }) =>
      getMessages({
        chatId,
        messageId,
        limit: MESSAGES_DEFAULT_LIMIT,
      }),
    onSuccess: (messages) => {
      if (messages?.length) {
        const list = formatList(messages);
        if (!isTransition) {
          startTransition(() => {
            setMessages((prev) => [...prev, ...list]);
          });
        }
      } else {
        setStartChatDate();
      }
    },
  });
};
