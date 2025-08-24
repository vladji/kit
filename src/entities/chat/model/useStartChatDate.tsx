import { Dispatch, SetStateAction, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import {
  ChatDateProps,
  ChatMessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { getDate, getTodayDate } from 'shared/lib/dates.ts';

interface Props {
  messages: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
}

export const useStartChatDate = ({ messages, setMessages }: Props) => {
  const locale = usePersistentStore((store) => store.locale);

  return useCallback(() => {
    const firstMessage = messages[messages.length - 1];

    if (firstMessage.type === 'message') {
      const date = (firstMessage as ChatMessageProps).createdAt;
      const formattedDate = getDate(locale, date);
      const todayDate = getTodayDate(locale);

      const chatDate: ChatDateProps = {
        id: formattedDate,
        type: 'date',
        date:
          formattedDate === todayDate ? (
            <FormattedMessage defaultMessage="Сегодня" />
          ) : (
            formattedDate
          ),
      };
      setMessages((prev) => [...prev, chatDate]);
    }
  }, [locale, messages, setMessages]);
};
