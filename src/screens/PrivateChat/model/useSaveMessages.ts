import { RefObject, useEffect } from 'react';
import { ViewToken } from 'react-native';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { getMessageAtIndex } from 'entities/chat/utils/getChatItemAtIndex.ts';

interface Props {
  chatId: string | null;
  viewableItemsRef: RefObject<ViewToken<MessagesListProps>[]>;
  messages: MessageProps[];
}

export const useSaveMessages = ({
  chatId,
  viewableItemsRef,
  messages,
}: Props) => {
  const setChatHistory = usePersistentStore((store) => store.setChatHistory);
  useEffect(() => {
    return () => {
      try {
        if (chatId && viewableItemsRef.current.length) {
          const firstViewableIndex = viewableItemsRef.current[0].index;
          const lastViewableIndex = viewableItemsRef.current?.at(-1)?.index;

          if (
            typeof firstViewableIndex === 'number' &&
            typeof lastViewableIndex === 'number'
          ) {
            const { index: firstIndex } = getMessageAtIndex(
              firstViewableIndex - 2,
              firstViewableIndex,
              messages,
            );

            const { index: lastIndex } = getMessageAtIndex(
              lastViewableIndex + 2,
              lastViewableIndex,
              messages,
            );

            const chunk = messages.slice(firstIndex, lastIndex + 1);
            setChatHistory(chatId, chunk);
          }
        }
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };
  }, [chatId, viewableItemsRef, setChatHistory, messages]);
};
