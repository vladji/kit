import { Dispatch, SetStateAction, useCallback } from 'react';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import {
  ChatDateProps,
  MessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { getDate, getTodayDate } from 'shared/lib/dates.ts';

interface Props {
  messagesState: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
}

export const useSetNewLocalMessage = ({
  messagesState,
  setMessages,
}: Props) => {
  const locale = usePersistentStore((store) => store.locale);

  return useCallback(
    (message: MessageProps) => {
      const todayDate = getTodayDate(locale);
      const lastMessage = messagesState.at(-1);

      if (lastMessage?.type === 'message') {
        const lastMessageDate = getDate(locale, lastMessage.createdAt);

        if (lastMessageDate !== todayDate) {
          const date: ChatDateProps = {
            id: todayDate,
            type: 'date',
            date: todayDate,
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
