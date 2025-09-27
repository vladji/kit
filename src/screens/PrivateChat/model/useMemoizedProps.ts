import { useCallback, useMemo } from 'react';
import { MessagesListProps } from 'entities/chat/model/types.ts';

export const useMemoizedProps = () => {
  const keyExtractor = useCallback((item: MessagesListProps) => item?.id, []);
  const getItemType = useCallback((item: MessagesListProps) => item?.type, []);
  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 1,
    }),
    [],
  );

  return {
    keyExtractor,
    getItemType,
    viewabilityConfig,
  };
};
