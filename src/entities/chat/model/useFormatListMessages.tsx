import { useCallback } from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import {
  ChatDateProps,
  MessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { getDateValue } from 'entities/chat/utils/getDateValue.tsx';
import { getDate } from 'shared/lib/dates.ts';

export const useFormatListMessages = () => {
  const locale = usePersistentStore((store) => store.locale);

  return useCallback(
    (data: MessageProps[]) => {
      const firstMessage = data[0];
      const date = getDate(locale, firstMessage.createdAt);
      const dateValue = getDateValue(locale, date);
      const currentDate: ChatDateProps = {
        id: date,
        type: 'date',
        date: dateValue,
      };

      return data
        .map((message, index) => {
          const date = getDate(locale, message.createdAt);
          const dateValue = getDateValue(locale, date);

          if (date !== currentDate.id) {
            currentDate.id = date;
            currentDate.date = dateValue;

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
