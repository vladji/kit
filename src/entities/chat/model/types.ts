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

export interface MessageProps {
  _id: string;
  chatId: string;
  from: string;
  to: string;
  text: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

type ChatItemType = 'message' | 'date';

export type ChatMessageProps = MessageProps & { type: ChatItemType };

export interface ChatDateProps {
  _id: string;
  type: ChatItemType;
  date: string;
}

export type MessagesListProps = ChatMessageProps | ChatDateProps;

export interface PrivateMessageProps {
  from: ChatMemberProps;
  to: ChatMemberProps;
  text: string;
  knownChatId: string | null;
}
