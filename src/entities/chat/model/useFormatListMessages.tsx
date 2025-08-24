import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import {
  ChatDateProps,
  MessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { getDate, getTodayDate } from 'shared/lib/dates.ts';

export const useFormatListMessages = () => {
  const locale = usePersistentStore((store) => store.locale);
  const todayDate = getTodayDate(locale);

  return useCallback(
    (data: MessageProps[]) => {
      const currentDate: ChatDateProps = {
        id: '',
        type: 'date',
        date: '',
      };

      return data
        .map((message, index) => {
          const date = getDate(locale, message.createdAt);
          const dateValue =
            date === todayDate ? (
              <FormattedMessage defaultMessage="Сегодня" />
            ) : (
              date
            );

          if (!currentDate.id) {
            currentDate.id = date;
            currentDate.date = dateValue;
          }

          if (date !== currentDate.id) {
            const data = [
              {
                ...currentDate,
              },
              {
                type: 'message',
                ...message,
              },
            ];

            currentDate.id = date;
            currentDate.date = dateValue;
            return data;
          }

          return {
            type: 'message',
            ...message,
          };
        })
        .flat() as MessagesListProps[];
    },
    [locale, todayDate],
  );
};
