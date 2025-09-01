import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { ChatDateProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { getMessageAtIndex } from 'entities/chat/utils/getChatItemAtIndex.ts';
import { getDate, getTodayDate } from 'shared/lib/dates.ts';

interface Props {
  messages: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransition: TransitionStartFunction;
}

export const useStartChatDate = ({
  messages,
  setMessages,
  startTransition,
}: Props) => {
  const locale = usePersistentStore((store) => store.locale);

  return useCallback(() => {
    const { item: firstMessage } = getMessageAtIndex(-1, messages);

    if (firstMessage?.createdAt) {
      const date = firstMessage.createdAt;
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

      startTransition(() => {
        setMessages((prev) => [...prev, chatDate]);
      });
    }
  }, [locale, messages, setMessages, startTransition]);
};
