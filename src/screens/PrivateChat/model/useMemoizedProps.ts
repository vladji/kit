import { RefObject, useCallback, useMemo } from 'react';
import { FlashListRef } from '@shopify/flash-list';
import { MessagesListProps } from 'entities/chat/model/types.ts';

interface Props {
  listRef: RefObject<FlashListRef<MessagesListProps> | null>;
}

type MaintainVisibleContentPositionProps = {
  disabled?: boolean | undefined;
  autoscrollToTopThreshold?: number | undefined;
  autoscrollToBottomThreshold?: number | undefined;
  animateAutoScrollToBottom?: boolean | undefined;
  startRenderingFromBottom?: boolean | undefined;
};

export const useMemoizedProps = ({ listRef }: Props) => {
  const keyExtractor = useCallback((item: MessagesListProps) => item.id, []);

  const maintainVisibleContentPosition =
    useMemo<MaintainVisibleContentPositionProps>(
      () => ({
        // disabled: true,
        // autoscrollToBottomThreshold: 2000,
        // animateAutoScrollToBottom: true,
        // startRenderingFromBottom: true,
      }),
      [],
    );

  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 1,
    }),
    [],
  );

  return {
    keyExtractor,
    maintainVisibleContentPosition,
    viewabilityConfig,
  };
};
