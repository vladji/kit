import { useCallback } from 'react';
import {
  ChatDateProps,
  ChatMessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { Date } from 'screens/PrivateChat/ui/Date.tsx';
import { Message } from 'screens/PrivateChat/ui/Message.tsx';

interface Props {
  selfProfileId?: string;
}

export const useRenderItem = ({ selfProfileId }: Props) => {
  return useCallback(
    ({ item }: { item: MessagesListProps }) => {
      if (!selfProfileId) return null;
      if (item?.type === 'message') {
        const message = item as ChatMessageProps;
        return (
          <Message
            from={message.from}
            text={message.text}
            createdAt={message.createdAt}
            selfId={selfProfileId}
            read={message.read}
          />
        );
      }
      if (item?.type === 'date') {
        const date = (item as ChatDateProps).date;
        return <Date date={date} />;
      }
      return null;
    },
    [selfProfileId],
  );
};
