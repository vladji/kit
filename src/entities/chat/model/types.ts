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
  createdAt: Date;
  updatedAt: Date;
  support?: SupportChatProps;
}

export interface ChatMessageProps {
  id: string;
  chatId: string;
  from: ChatMemberProps;
  to: ChatMemberProps;
  text: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrivateMessageProps {
  from: ChatMemberProps;
  to: ChatMemberProps;
  text: string;
  knownChatId: string | null;
}

export interface ChatProfileProps {
  userId: string;
  chatName: string | null;
  avatarUrl: string | null;
}
