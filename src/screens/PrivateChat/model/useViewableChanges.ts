import { Dispatch, SetStateAction, startTransition, useRef } from 'react';
import { ViewToken } from 'react-native';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { markAsRead } from 'screens/PrivateChat/utils/markAsRead.ts';

interface Props {
  anyAdmin: boolean;
  readerId: string | null;
  setShowBottomButton: Dispatch<SetStateAction<boolean>>;
  latestMessages?: MessageProps[];
}

export const useViewableChanges = ({
  anyAdmin,
  readerId,
  setShowBottomButton,
  latestMessages,
}: Props) => {
  const viewableItemsRef = useRef<ViewToken<MessagesListProps>[]>([]);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<MessagesListProps>[];
  }) => {
    viewableItemsRef.current = viewableItems;
    requestAnimationFrame(() => {
      markAsRead({ viewableItems, readerId, anyAdmin });
    });

    const lastViewableItem = viewableItems.at(-1)?.item;
    const latestMessage = latestMessages?.at(-1);
    const showBottomButton = latestMessage?.id !== lastViewableItem?.id;
    startTransition(() => setShowBottomButton(showBottomButton));
  };

  return {
    onViewableItemsChanged,
    viewableItemsRef,
  };
};
