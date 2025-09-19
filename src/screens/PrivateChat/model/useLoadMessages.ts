import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
} from 'react';
import { useGetMessagesAfter } from 'entities/chat/api/useGetMessagesAfter.ts';
import { useGetMessagesBefore } from 'entities/chat/api/useGetMessagesBefore.ts';
import { Direction } from 'entities/chat/model/constants.ts';
import { MessagesListProps } from 'entities/chat/model/types.ts';
import { getMessageAtIndex } from 'entities/chat/utils/getChatItemAtIndex.ts';

interface Props {
  chatId: string | null;
  messages: MessagesListProps[];
  setMessages: Dispatch<SetStateAction<MessagesListProps[]>>;
  startTransitionMessages: TransitionStartFunction;
  isTransition: boolean;
}

export const useLoadMessages = ({
  chatId,
  messages,
  setMessages,
  startTransitionMessages,
  isTransition,
}: Props) => {
  const { mutate: getMessagesBefore, isPending: messagesBeforeLoading } =
    useGetMessagesBefore({
      messagesState: messages,
      setMessages,
      startTransitionMessages,
    });

  const { mutate: getMessagesAfter, isPending: messagesAfterLoading } =
    useGetMessagesAfter({
      setMessages,
      startTransitionMessages,
    });

  const onStartReached = useCallback(() => {
    const { item } = getMessageAtIndex(0, messages, Direction.Before);
    if (item?.id && !messagesAfterLoading && !isTransition) {
      getMessagesBefore({ chatId, messageId: item.id });
    }
  }, [chatId, messages, getMessagesBefore, messagesAfterLoading, isTransition]);

  const onEndReached = useCallback(async () => {
    const { item } = getMessageAtIndex(-1, messages);
    if (item?.id && !messagesBeforeLoading && !isTransition) {
      getMessagesAfter({ chatId, messageId: item.id });
    }
  }, [chatId, messages, getMessagesAfter, messagesBeforeLoading, isTransition]);

  return {
    onStartReached,
    onEndReached,
  };
};
