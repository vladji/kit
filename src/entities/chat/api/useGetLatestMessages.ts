import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { useFormatListMessages } from 'entities/chat/model/useFormatListMessages.ts';

interface Props {
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
}

export const useGetLatestMessages = ({ setMessages }: Props) => {
  const formatList = useFormatListMessages();

  return useMutation<
    MessageProps[],
    unknown,
    Omit<GetMessagesRequest, 'limit' | 'direction' | 'messageId' | 'readerId'>
  >({
    mutationFn: ({ chatId }) =>
      getMessages({
        chatId,
        limit: Math.round(MESSAGES_DEFAULT_LIMIT),
        messageId: null,
        readerId: null,
        direction: null,
      }),
    onSuccess: (messages) => {
      if (messages?.length) {
        const list = formatList(messages);
        setMessages(list);
      }
    },
  });
};
