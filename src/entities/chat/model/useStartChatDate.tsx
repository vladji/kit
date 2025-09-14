import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { ChatDateProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { getDate, getTodayDate } from 'shared/lib/dates.ts';

interface Props {
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransition: TransitionStartFunction;
}

export const useStartChatDate = ({ setMessages, startTransition }: Props) => {
  const locale = usePersistentStore((store) => store.locale);

  return useCallback(
    (messages: MessagesListProps[]) => {
      const firstMessage = messages[0];

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
          setMessages((prev) => [chatDate, ...prev]);
        });
      }
    },
    [locale, setMessages, startTransition],
  );
};
