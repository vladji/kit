import { Dispatch, SetStateAction } from 'react';
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
}

export const useGetMessagesBefore = ({ messagesState, setMessages }: Props) => {
  const setStartChatDate = useStartChatDate({
    messages: messagesState,
    setMessages,
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
        setMessages((prev) => [...prev, ...list]);
      } else {
        setStartChatDate();
      }
    },
  });
};
