import { RefObject, useEffect } from 'react';
import { FlatList } from 'react-native';
import { MessagesListProps } from 'entities/chat/model/types.ts';
import { ContentMetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  listRef: RefObject<FlatList<MessagesListProps> | null>;
  contentMetaRef: RefObject<ContentMetaRefProps>;
  deferredMessages: MessagesListProps[];
  firstUnreadMessageId: string | null;
}

export const useInitialPosition = ({
  listRef,
  contentMetaRef,
  deferredMessages,
  firstUnreadMessageId,
}: Props) => {
  useEffect(() => {
    if (
      !contentMetaRef.current.isReady ||
      !contentMetaRef.current.firstRender
    ) {
      return;
    }
    contentMetaRef.current.firstRender = false;

    const targetIndex = deferredMessages.findIndex(
      (item) => item.id === firstUnreadMessageId,
    );

    const scrollIndex =
      targetIndex < 0
        ? deferredMessages.length - 1
        : targetIndex - 1 < 0
        ? 0
        : targetIndex - 1;

    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        index: scrollIndex,
        animated: false,
        viewPosition: 1,
      });
    });

    setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: scrollIndex,
        animated: false,
        viewPosition: 1,
      });
    }, 300);
  }, [listRef, contentMetaRef, deferredMessages, firstUnreadMessageId]);
};
