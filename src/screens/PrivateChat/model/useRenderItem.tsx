import { useCallback } from 'react';
import {
  ChatDateProps,
  ChatMemberProps,
  ChatMessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';
import { Date } from 'screens/PrivateChat/ui/Date.tsx';
import { Message } from 'screens/PrivateChat/ui/Message.tsx';

interface Props {
  selfProfile: ChatMemberProps | null;
}

export const useRenderItem = ({ selfProfile }: Props) => {
  return useCallback(
    ({ item }: { item?: MessagesListProps }) => {
      if (!selfProfile) return null;
      if (item?.type === 'message') {
        const message = item as ChatMessageProps;
        return (
          <Message
            from={message.from}
            text={message.text}
            createdAt={message.createdAt}
            selfId={selfProfile.id}
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
    [selfProfile],
  );
};
