import api from 'app/api/api.ts';
import jwtApi from 'app/api/jwtApi.ts';
import { PaginationRequest, PaginationResponse } from 'app/api/types.ts';
import {
  GetMemberChatsRequest,
  GetMessagesRequest,
} from 'entities/chat/api/types.ts';
import { ChatMessageProps, ChatProps } from 'entities/chat/model/types.ts';

export const getAdminSupportAllChats = ({
  page,
  limit,
}: PaginationRequest): Promise<PaginationResponse<ChatProps[]>> =>
  jwtApi({
    url: `/chat/admin/all-support?page=${page}&limit=${limit}`,
  });

export const getMemberAllChats = ({
  member,
  page,
  limit,
}: PaginationRequest<GetMemberChatsRequest>): Promise<
  PaginationResponse<ChatProps[]>
> =>
  api({
    url: `/chat/member/all-chats?member=${member}&page=${page}&limit=${limit}`,
  });

export const getMessages = ({
  chatId,
  page,
  limit,
}: PaginationRequest<GetMessagesRequest>): Promise<
  PaginationResponse<ChatMessageProps[]>
> =>
  api({
    url: `/chat/messages?chatId=${chatId}&page=${page}&limit=${limit}`,
  });
