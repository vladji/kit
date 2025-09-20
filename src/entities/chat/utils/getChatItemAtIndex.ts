import { MessageProps } from 'entities/chat/model/types.ts';

interface ReturnType {
  item: MessageProps | null;
  index: number;
}

export const getMessageAtIndex = (
  index: number,
  stopIndex: number,
  list: MessageProps[],
): ReturnType => {
  if (index < 0 && index < stopIndex) {
    const nextIndex = index + 1;
    return getMessageAtIndex(nextIndex, stopIndex, list);
  }
  if (index > list.length - 1 && index > stopIndex) {
    const nextIndex = index - 1;
    return getMessageAtIndex(nextIndex, stopIndex, list);
  }

  const item = list.at(index);

  if (!item) {
    return {
      item: null,
      index,
    };
  }
  return {
    item,
    index,
  };
};
