export interface GetMessagesRequest {
  chatId: string | null;
}

export interface GetMemberChatsRequest {
  memberId: string | null;
  support?: boolean;
}
