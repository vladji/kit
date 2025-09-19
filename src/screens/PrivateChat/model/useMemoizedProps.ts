import { RefObject, useCallback, useMemo } from 'react';
import { FlatList } from 'react-native';
import { MessagesListProps } from 'entities/chat/model/types.ts';

interface Props {
  listRef: RefObject<FlatList<MessagesListProps> | null>;
}

export const useMemoizedProps = ({ listRef }: Props) => {
  const keyExtractor = useCallback((item: MessagesListProps) => item.id, []);

  const maintainVisibleContentPosition = useMemo(
    () => ({
      minIndexForVisible: 0,
    }),
    [],
  );

  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 5,
    }),
    [],
  );

  const onScrollToIndexFailed = useCallback(
    ({
      averageItemLength,
      index,
    }: {
      averageItemLength: number;
      index: number;
    }) => {
      requestAnimationFrame(() => {
        listRef.current?.scrollToOffset({
          offset: averageItemLength * index,
          animated: true,
        });
      });
    },
    [],
  );

  return {
    keyExtractor,
    maintainVisibleContentPosition,
    viewabilityConfig,
    onScrollToIndexFailed,
  };
};
