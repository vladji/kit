import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
} from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { ChatDateProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { getDate } from 'shared/lib/dates.ts';

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
        const date = getDate(locale, firstMessage.createdAt);

        const chatDate: ChatDateProps = {
          id: date,
          type: 'date',
          date: date,
        };

        startTransition(() => {
          setMessages((prev) => [chatDate, ...prev]);
        });
      }
    },
    [locale, setMessages, startTransition],
  );
};
