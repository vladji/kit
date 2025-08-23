import { Dispatch, SetStateAction, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import { ChatMessageProps } from 'entities/chat/model/types.ts';

interface Props extends GetMessagesRequest {
  setMessages: Dispatch<SetStateAction<ChatMessageProps[]>>;
}

export const useGetMessages = ({ chatId, setMessages }: Props) => {
  const select = useCallback(
    (data: ChatMessageProps[]) => {
      setMessages(data);
    },
    [setMessages],
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, chatId],
    queryFn: () => getMessages({ chatId, limit: MESSAGES_DEFAULT_LIMIT }),
    select,
    enabled: !!chatId,
  });

  return {
    fetchedMessages: data,
    loading: isLoading,
  };
};

// const selectSection = useCallback(
//   (data: PaginationResponse<{ messages: ChatMessageProps[] }>) => {
//     const sortedObj = data.messages.reduce((acc, item) => {
//       const date = getDate(locale, item.createdAt);
//       return {
//         ...acc,
//         [date]: [...(acc[date] || []), item],
//       };
//     }, {} as Record<string, ChatMessageProps[]>);
//
//     const messages = Object.entries(sortedObj)?.map<MessagesListProps>(
//       ([key, value]) => ({
//         title: key,
//         data: value,
//       }),
//     );
//
//     setMessages(messages);
//   },
//   [locale, setMessages],
// );
