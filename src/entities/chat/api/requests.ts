import api from 'app/api/api.ts';
import { PaginationRequest, PaginationResponse } from 'app/api/types.ts';
import {
  GetMemberChatsRequest,
  GetMessagesRequest,
  MessagesAroundResponse,
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
  chatId,
  limit,
  messageId,
  direction,
}: GetMessagesRequest): Promise<MessageProps[]> => {
  const url = messageId
    ? `/chat/messages?chatId=${chatId}&messageId=${messageId}&direction=${direction}&limit=${limit}`
    : `/chat/messages?chatId=${chatId}&limit=${limit}`;
  return api({ url });
};

export const getMessagesAround = ({
  chatId,
  readerId,
  limit,
}: GetMessagesRequest): Promise<MessagesAroundResponse> => {
  return api({
    url: `/chat/messages/around?chatId=${chatId}&readerId=${readerId}&limit=${limit}`,
  });
};
