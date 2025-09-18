import { Direction } from 'entities/chat/model/constants.ts';
import { MessageProps } from 'entities/chat/model/types.ts';

export interface GetMemberChatsRequest {
  memberId: string | null;
  support?: boolean;
}

export interface GetMessagesRequest {
  chatId: string | null;
  messageId: string | null;
  readerId: string | null;
  limit: number;
  direction: Direction | null;
}

export interface MessagesAroundResponse {
  messagesAround: MessageProps[];
  firstUnreadMessageId: string | null;
}
