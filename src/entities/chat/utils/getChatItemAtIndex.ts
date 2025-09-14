import { Direction } from 'entities/chat/model/constants.ts';
import {
  ChatMessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';

interface ReturnType {
  item: ChatMessageProps | null;
  index: number;
  direction: Direction;
}

export const getMessageAtIndex = (
  index: number,
  list: MessagesListProps[],
  direction = Direction.After,
): ReturnType => {
  const item = list.at(index);
  if (item && item.type !== 'message') {
    return direction === Direction.After
      ? getMessageAtIndex(index - 1, list, direction)
      : getMessageAtIndex(index + 1, list, direction);
  }
  if (!item || item.type !== 'message') {
    return {
      item: null,
      index,
      direction,
    };
  }
  return {
    item: item as ChatMessageProps,
    index,
    direction,
  };
};
