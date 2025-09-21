import { RefObject, useEffect } from 'react';
import { ViewToken } from 'react-native';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import {
  ChatMessageProps,
  MessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';

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
          const list = viewableItemsRef.current
            ?.map((item) => item.item)
            ?.filter((item) => item.type === 'message');

          if (list.length) {
            setChatHistory(chatId, list as ChatMessageProps[]);
          }
        }
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };
  }, [chatId, viewableItemsRef, setChatHistory]);
};
