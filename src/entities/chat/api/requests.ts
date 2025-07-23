import api from 'app/api/api.ts';
import { ApiResponse } from 'app/api/types.ts';
import {
  GetAppChatsRequest,
  GetMessagesRequest,
} from 'entities/chat/api/types.ts';
import { ChatMessageProps, ChatProps } from 'entities/chat/model/types.ts';

export const getAllChats = ({
  member,
}: GetAppChatsRequest): Promise<ApiResponse<ChatProps[]>> =>
  api({
    url: `/chat/all-chats?member=${member}`,
  });

export const getMessages = ({
  chatId,
}: GetMessagesRequest): Promise<ApiResponse<ChatMessageProps[]>> =>
  api({
    url: `/chat/messages?chatId=${chatId}`,
  });
