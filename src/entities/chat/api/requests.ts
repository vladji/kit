import api from 'app/api/api.ts';
import { PaginationRequest, PaginationResponse } from 'app/api/types.ts';
import {
  GetMemberChatsRequest,
  GetMessagesRequest,
} from 'entities/chat/api/types.ts';
import { ChatProps, MessageProps } from 'entities/chat/model/types.ts';

export const getMemberChats = ({
  memberId,
  support = false,
  page,
  limit,
}: PaginationRequest<GetMemberChatsRequest>): Promise<
  PaginationResponse<{ chats: ChatProps[] }>
> => {
  const url = support
    ? `/chats/member?memberId=${memberId}&support=${support}&page=${page}&limit=${limit}`
    : `/chats/member?memberId=${memberId}&page=${page}&limit=${limit}`;
  return api({ url });
};

export const getMessages = ({
  limit,
  chatId,
  messageId,
}: GetMessagesRequest): Promise<MessageProps[]> => {
  const url = messageId
    ? `/chat/messages?chatId=${chatId}&messageId=${messageId}&limit=${limit}`
    : `/chat/messages?chatId=${chatId}&limit=${limit}`;
  return api({ url });
};
