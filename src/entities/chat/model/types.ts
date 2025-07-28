import { UserRoles } from 'entities/user/model/types.ts';

export interface ChatMemberProps {
  id: string;
  role: UserRoles;
  name: string;
  avatarUrl: string | null;
}

export interface ChatProps {
  chatId: string;
  members: ChatMemberProps[];
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
  support?: boolean;
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
  knownChatId?: string;
}

export interface ChatProfileProps {
  chatName: string | null;
  avatarUrl: string | null;
}
