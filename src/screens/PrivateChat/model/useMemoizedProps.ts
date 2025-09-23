import { RefObject, useCallback, useMemo } from 'react';
import { FlashListRef } from '@shopify/flash-list';
import { MessagesListProps } from 'entities/chat/model/types.ts';

interface Props {
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
}

export const useMemoizedProps = ({ listRef }: Props) => {
  const keyExtractor = useCallback((item: MessagesListProps) => item.id, []);

  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 1,
    }),
    [],
  );

  return {
    keyExtractor,
    viewabilityConfig,
  };
};
