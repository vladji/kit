export interface ChatProps {
  chatId: string;
  members: string[];
  lastMessage: string;
  support?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessageProps {
  chatId: string;
  from: string;
  to: string;
  text: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
