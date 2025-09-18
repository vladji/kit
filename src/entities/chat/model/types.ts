import { ReactElement } from 'react';
import { UserRoles } from 'entities/user/model/types.ts';

export interface ChatMemberProps {
  id: string;
  role: UserRoles;
  name: string;
  avatarUrl: string | null;
}

export interface SupportChatProps {
  closed: boolean;
  admin?: ChatMemberProps;
}

export interface ChatProps {
  chatId: string;
  members: ChatMemberProps[];
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
  support?: SupportChatProps;
}

type ChatItemType = 'message' | 'date';

export interface MessageProps {
  id: string;
  chatId: string;
  from: string;
  to: string;
  text: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ChatMessageProps = MessageProps & { type: ChatItemType };

export interface ChatDateProps extends Partial<ChatMessageProps> {
  id: string;
  type: ChatItemType;
  date: string | ReactElement;
}

export type MessagesListProps = ChatMessageProps | ChatDateProps;

export interface PrivateMessageProps {
  from: ChatMemberProps;
  to: ChatMemberProps;
  text: string;
  knownChatId: string | null;
}

export interface MarkAsReadSocketProps {
  chatId: string;
  lastSeenMessageId: string;
  readerId: string;
  isAdmin: boolean;
}

export interface MarkedAsReadNotifySocketProps {
  chatId: string;
  messageIds: string[];
}
