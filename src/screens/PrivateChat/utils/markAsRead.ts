import { ViewToken } from 'react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import {
  ChatMessageProps,
  MarkAsReadSocketProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';

interface Props {
  viewableItems: ViewToken<MessagesListProps>[];
  anyAdmin: boolean;
  chatSupport: boolean;
  readerId: string;
}

export const markAsRead = ({
  viewableItems,
  anyAdmin,
  chatSupport,
  readerId,
}: Props) => {
  const filtered = viewableItems.filter(
    (item) =>
      item.item.type === 'message' &&
      !item.item.read &&
      item.item.to === readerId,
  );

  const lastVisibleItem = filtered.at(-1) as ViewToken<ChatMessageProps>;
  if (!lastVisibleItem?.item) return;

  const { id, chatId, to } = lastVisibleItem.item;

  const markAsReadData: MarkAsReadSocketProps = {
    chatId,
    lastSeenMessageId: id,
    readerId: to,
    chatSupport,
    anyAdmin,
  };

  safeSocket()?.emit('mark_as_read', markAsReadData);
};
