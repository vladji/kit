import { RefObject, useEffect } from 'react';
import { ViewToken } from 'react-native';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { MessagesListProps } from 'entities/chat/model/types.ts';

interface Props {
  chatId: string | null;
  viewableItemsRef: RefObject<ViewToken<MessagesListProps>[]>;
}

export const useCloseChat = ({ chatId, viewableItemsRef }: Props) => {
  const setChatHistory = usePersistentStore((store) => store.setChatHistory);
  useEffect(() => {
    return () => {
      if (chatId && viewableItemsRef.current.length) {
        const lastSeenMessages = viewableItemsRef.current.map(
          (item) => item.item,
        );
        setChatHistory(chatId, lastSeenMessages);
      }
    };
  }, [chatId, viewableItemsRef, setChatHistory]);
};
