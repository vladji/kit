import { ViewToken } from 'react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { CHAT_SUPPORT } from 'entities/chat/model/constants.ts';
import {
  ChatMessageProps,
  MarkAsReadSocketProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';

interface Props {
  viewableItems: ViewToken<MessagesListProps>[];
  anyAdmin: boolean;
  readerId: string | null;
}

export const markAsRead = ({ viewableItems, readerId, anyAdmin }: Props) => {
  const filtered = viewableItems.filter(
    (item) =>
      item.item.type === 'message' &&
      !item.item.read &&
      (item.item.to === readerId ||
        (anyAdmin && item.item.to === CHAT_SUPPORT)),
  );

  const lastVisibleItem = filtered.at(-1) as ViewToken<ChatMessageProps>;
  if (!lastVisibleItem?.item) return;

  const { id, chatId, to } = lastVisibleItem.item;

  const markAsReadData: MarkAsReadSocketProps = {
    chatId,
    lastSeenMessageId: id,
    readerId: to,
    isAdmin: anyAdmin,
  };

  safeSocket()?.emit('mark_as_read', markAsReadData);
};
