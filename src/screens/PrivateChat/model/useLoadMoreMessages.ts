import { Dispatch, RefObject, SetStateAction, useCallback } from 'react';
import { useGetMessagesAfter } from 'entities/chat/api/useGetMessagesAfter.ts';
import { useGetMessagesBefore } from 'entities/chat/api/useGetMessagesBefore.ts';
import { MessageProps } from 'entities/chat/model/types.ts';
import { MetaRefProps } from 'screens/PrivateChat/types.ts';

interface Props {
  chatId: string | null;
  messages: MessageProps[];
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  metaRef: RefObject<MetaRefProps>;
}

export const useLoadMoreMessages = ({
  chatId,
  messages,
  setMessages,
  metaRef,
}: Props) => {
  const { mutate: getMessagesBefore } = useGetMessagesBefore({
    setMessages,
  });

  const { mutate: getMessagesAfter } = useGetMessagesAfter({
    setMessages,
  });

  const onStartReached = useCallback(() => {
    const item = messages[0];

    if (item?.id && metaRef.current.loadStartId === null) {
      metaRef.current.loadStartId = item.id;
      getMessagesBefore({ chatId, messageId: item.id });
    }
  }, [chatId, messages, getMessagesBefore, metaRef]);

  const onEndReached = useCallback(async () => {
    const item = messages.at(-1);

    if (item?.id && metaRef.current.loadEndId === null) {
      metaRef.current.loadEndId = item.id;
      getMessagesAfter({ chatId, messageId: item.id });
    }
  }, [chatId, messages, getMessagesAfter, metaRef]);

  return {
    onStartReached,
    onEndReached,
  };
};
