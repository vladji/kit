import { useCallback } from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import {
  ChatDateProps,
  MessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { getDate } from 'shared/lib/dates.ts';

export const useFormatListMessages = () => {
  const locale = usePersistentStore((store) => store.locale);

  return useCallback(
    (data: MessageProps[]) => {
      const firstMessage = data[0];
      const date = getDate(locale, firstMessage.createdAt);
      const currentDate: ChatDateProps = {
        id: date,
        type: 'date',
        date: date,
      };

      return data
        .map((message) => {
          const date = getDate(locale, message.createdAt);
          const isInitialMessage = !!message.isInitialMessage;

          if (date !== currentDate.id || isInitialMessage) {
            currentDate.id = date;
            currentDate.date = date;

            return [
              {
                ...currentDate,
              },
              {
                type: 'message',
                ...message,
              },
            ];
          }

          return {
            type: 'message',
            ...message,
          };
        })
        .flat() as MessagesListProps[];
    },
    [locale],
  );
};
