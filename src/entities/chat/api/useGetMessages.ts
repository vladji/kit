import { Dispatch, SetStateAction, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { getMessages } from 'entities/chat/api/requests.ts';
import { GetMessagesRequest } from 'entities/chat/api/types.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { getDate } from 'shared/lib/dates.ts';

interface Props extends GetMessagesRequest {
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
}

export const useGetMessages = ({ chatId, setMessages }: Props) => {
  const locale = usePersistentStore((store) => store.locale);

  const select = useCallback(
    (data: MessageProps[]) => {
      let currentDate = '';

      const list = data
        .map((message) => {
          const date = getDate(locale, message.createdAt);

          if (!currentDate) {
            currentDate = date;
          }

          if (date !== currentDate) {
            const data = [
              {
                _id: currentDate,
                type: 'date',
                date: currentDate,
              },
              {
                type: 'message',
                ...message,
              },
            ];
            currentDate = date;
            return data;
          }
          return {
            type: 'message',
            ...message,
          };
        })
        .flat() as MessagesListProps[];

      setMessages(list);
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
