import { Dispatch, SetStateAction, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import {
  ChatDateProps,
  ChatMessageProps,
  MessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { getDate, getTodayDate } from 'shared/lib/dates.ts';

interface Props {
  messagesState: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
}

export const useSetLocalMessage = ({ messagesState, setMessages }: Props) => {
  const locale = usePersistentStore((store) => store.locale);

  return useCallback(
    (message: MessageProps) => {
      const todayDate = getTodayDate(locale);
      const lastMessage = messagesState.at(-1);

      if (lastMessage?.type === 'message') {
        const lastMessageISODate = (lastMessage as ChatMessageProps).createdAt;
        const lastMessageDate = getDate(locale, lastMessageISODate);

        if (lastMessageDate !== todayDate) {
          const date: ChatDateProps = {
            id: todayDate,
            type: 'date',
            date: <FormattedMessage defaultMessage="Сегодня" />,
          };
          setMessages((prev) => [
            ...prev,
            date,
            { type: 'message', ...message },
          ]);
        } else {
          setMessages((prev) => [...prev, { type: 'message', ...message }]);
        }
      }
    },
    [locale, messagesState, setMessages],
  );
};
