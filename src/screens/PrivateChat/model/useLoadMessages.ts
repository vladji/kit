import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
} from 'react';
import { useGetMessagesAfter } from 'entities/chat/api/useGetMessagesAfter.ts';
import { useGetMessagesBefore } from 'entities/chat/api/useGetMessagesBefore.ts';
import { MessageProps } from 'entities/chat/model/types.ts';

interface Props {
  chatId: string | null;
  messages: MessageProps[];
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
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
      setMessages,
      startTransitionMessages,
    });

  const { mutate: getMessagesAfter, isPending: messagesAfterLoading } =
    useGetMessagesAfter({
      setMessages,
      startTransitionMessages,
    });

  const onStartReached = useCallback(() => {
    const item = messages[0];

    if (item?.id && !messagesAfterLoading && !isTransition) {
      getMessagesBefore({ chatId, messageId: item.id });
    }
  }, [chatId, messages, getMessagesBefore, messagesAfterLoading, isTransition]);

  const onEndReached = useCallback(async () => {
    const item = messages.at(-1);

    if (item?.id && !messagesBeforeLoading && !isTransition) {
      getMessagesAfter({ chatId, messageId: item.id });
    }
  }, [chatId, messages, getMessagesAfter, messagesBeforeLoading, isTransition]);

  return {
    onStartReached,
    onEndReached,
  };
};
