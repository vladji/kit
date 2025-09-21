import {
  Dispatch,
  RefObject,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
} from 'react';
import { FlatList } from 'react-native';
import { useFetchLatestMessages } from 'entities/chat/api/useFetchLatestMessages.ts';
import { MessageProps, MessagesListProps } from 'entities/chat/model/types.ts';

interface Props {
  chatId: string | null;
  startTransitionMessages: TransitionStartFunction;
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  listRef: RefObject<FlatList<MessagesListProps> | null>;
}

export const useNavigateToBottom = ({
  chatId,
  setMessages,
  startTransitionMessages,
  listRef,
}: Props) => {
  const { latestMessages, refetch } = useFetchLatestMessages({ chatId });

  return useCallback(
    (lastMessage: MessageProps) => {
      if (latestMessages?.length) {
        startTransitionMessages(() => {
          setMessages([...latestMessages, lastMessage]);
        });
        setTimeout(() => {
          listRef.current?.scrollToEnd({ animated: true });
          refetch();
        });
      }
    },
    [latestMessages, setMessages, startTransitionMessages, listRef, refetch],
  );
};
