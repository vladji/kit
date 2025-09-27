import { RefObject, useCallback } from 'react';
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
  return useCallback(() => {
    try {
      if (chatId && viewableItemsRef.current.length) {
        const ids = viewableItemsRef.current
          ?.filter((item) => item.item.type === 'message')
          ?.map((item) => item.item.id);

        const startIndex = messages.findIndex((item) => item.id === ids[0]);
        const endIndex = messages.findIndex((item) => item.id === ids.at(-1));
        const list = messages.slice(startIndex, endIndex + 1);

        if (list.length) {
          setChatHistory(chatId, list as ChatMessageProps[]);
        }
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }, [setChatHistory, chatId, messages, viewableItemsRef]);
};
