import { Dispatch, SetStateAction, startTransition, useRef } from 'react';
import { ViewToken } from 'react-native';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { markAsRead } from 'screens/PrivateChat/utils/markAsRead.ts';
import { useDebounce } from 'shared/lib/useDebounce.ts';

interface Props {
  chatSupport: boolean;
  anyAdmin: boolean;
  readerId: string | null;
  setShowBottomButton: Dispatch<SetStateAction<boolean>>;
  latestMessages?: MessageProps[];
}

export const useViewableChanges = ({
  chatSupport,
  anyAdmin,
  readerId,
  setShowBottomButton,
  latestMessages,
}: Props) => {
  const viewableItemsRef = useRef<ViewToken<MessagesListProps>[]>([]);

  const debounce = useDebounce();
  const showBottomButtonCallback = debounce((show: boolean) => {
    startTransition(() => setShowBottomButton(show));
  }, 100);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<MessagesListProps>[];
  }) => {
    viewableItemsRef.current = viewableItems;
    if (readerId) {
      requestAnimationFrame(() => {
        markAsRead({ viewableItems, readerId, anyAdmin, chatSupport });
      });
    }

    const lastViewableItem = viewableItems.at(-1)?.item;
    const latestMessage = latestMessages?.at(-1);
    const showBottomButton = latestMessage?.id !== lastViewableItem?.id;
    showBottomButtonCallback(showBottomButton);
  };

  return {
    onViewableItemsChanged,
    viewableItemsRef,
  };
};
