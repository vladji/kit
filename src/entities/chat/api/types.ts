export interface GetMessagesRequest {
  limit: number;
  chatId: string | null;
  messageId: string | null;
}

export interface GetMemberChatsRequest {
  memberId: string | null;
  support?: boolean;
}
