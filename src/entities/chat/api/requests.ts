import api from 'app/api/api.ts';
import { PaginationRequest, PaginationResponse } from 'app/api/types.ts';
import {
  GetMemberChatsRequest,
  GetMessagesRequest,
  MessagesAroundResponse,
} from 'entities/chat/api/types.ts';
import { MESSAGES_DEFAULT_LIMIT } from 'entities/chat/model/constants.ts';
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
  messageId,
  direction,
  limit = MESSAGES_DEFAULT_LIMIT,
  includeCurrent = false,
}: GetMessagesRequest): Promise<MessageProps[]> => {
  const url = messageId
    ? `/chat/messages?chatId=${chatId}&messageId=${messageId}&direction=${direction}&limit=${limit}&includeCurrent=${includeCurrent}`
    : `/chat/messages?chatId=${chatId}&limit=${limit}`;
  return api({ url });
};

export const getRecentlyMessages = ({
  chatId,
  readerId,
  limit = MESSAGES_DEFAULT_LIMIT,
}: GetMessagesRequest): Promise<MessagesAroundResponse> => {
  return api({
    url: `/chat/messages/recently?chatId=${chatId}&readerId=${readerId}&limit=${limit}`,
  });
};
