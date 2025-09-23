import { useCallback, useMemo } from 'react';
import { MessagesListProps } from 'entities/chat/model/types.ts';

export const useMemoizedProps = () => {
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
