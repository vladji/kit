import jwtApi from 'app/api/jwtApi.ts';
import {
  ApiResponse,
  PaginationRequest,
  PaginationResponse,
} from 'app/api/types.ts';
import { AdminProps } from 'entities/admin/model/types.ts';
import { ChatProps } from 'entities/chat/model/types.ts';

export const getAdmin = (
  adminId: string | null,
): Promise<ApiResponse<AdminProps>> =>
  jwtApi({
    url: `/admin/${adminId}`,
  });

export const getAllClientChats = ({
  page,
  limit,
}: PaginationRequest): Promise<PaginationResponse<{ chats: ChatProps[] }>> =>
  jwtApi({
    url: `/admin/chats/all/clients?page=${page}&limit=${limit}`,
  });

export const getAllStoreChats = ({
  page,
  limit,
}: PaginationRequest): Promise<PaginationResponse<{ chats: ChatProps[] }>> =>
  jwtApi({
    url: `/admin/chats/all/stores?page=${page}&limit=${limit}`,
  });
