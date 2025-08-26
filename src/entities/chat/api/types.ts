import { Direction } from 'entities/chat/model/constants.ts';

export interface GetMessagesRequest {
  limit: number;
  chatId: string | null;
  messageId: string | null;
  direction: Direction | null;
}

export interface GetMemberChatsRequest {
  memberId: string | null;
  support?: boolean;
}
