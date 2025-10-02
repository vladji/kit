import { RefObject, useEffect } from 'react';
import { FlashListRef } from '@shopify/flash-list';
import { MessagesListProps } from 'entities/chat/model/types.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  metaRef: RefObject<MetaRefProps>;
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
  deferredMessages: MessagesListProps[];
}

export const useScrollToBottom = ({
  metaRef,
  listRef,
  deferredMessages,
}: Props) => {
  useEffect(() => {
    if (metaRef.current.shouldScrollToBottom) {
      listRef.current?.scrollToEnd({ animated: true });
      metaRef.current.shouldScrollToBottom = false;
    }
  }, [deferredMessages, metaRef, listRef]);
};
