import {
  Dispatch,
  SetStateAction,
  startTransition,
  useCallback,
  useRef,
} from 'react';
import { ViewToken } from 'react-native';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';
import { markAsRead } from 'screens/PrivateChat/utils/markAsRead.ts';

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

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<MessagesListProps>[] }) => {
      viewableItemsRef.current = viewableItems;
      if (readerId) {
        requestAnimationFrame(() => {
          markAsRead({ viewableItems, readerId, anyAdmin, chatSupport });
        });
      }

      const lastViewableItem = viewableItems.at(-1)?.item;
      const latestMessage = latestMessages?.at(-1);
      const showBottomButton = latestMessage?.id !== lastViewableItem?.id;
      startTransition(() => setShowBottomButton(showBottomButton));
    },
    [anyAdmin, chatSupport, latestMessages, readerId, setShowBottomButton],
  );

  return {
    onViewableItemsChanged,
    viewableItemsRef,
  };
};
