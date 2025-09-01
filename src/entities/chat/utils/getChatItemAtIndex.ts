import {
  ChatMessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';

interface ReturnType {
  item: ChatMessageProps | null;
  index: number;
}

export const getMessageAtIndex = (
  index: number,
  list: MessagesListProps[],
): ReturnType => {
  const item = list.at(index);
  if (item && item.type !== 'message') {
    getMessageAtIndex(index - 1, list);
  }
  if (!item || item.type !== 'message') {
    return {
      item: null,
      index,
    };
  }
  return {
    item: item as ChatMessageProps,
    index,
  };
};
