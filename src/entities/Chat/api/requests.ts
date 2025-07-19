import api from 'app/api/axios.ts';
import { ApiResponse } from 'app/api/types.ts';
import { GetMessagesRequest } from 'entities/Chat/api/types.ts';
import { ChatMessageProps } from 'entities/Chat/model/types.ts';

export const getMessages = ({
  chatId,
}: GetMessagesRequest): Promise<ApiResponse<ChatMessageProps[]>> =>
  api({
    url: `/chat/messages?chatId=${chatId}`,
  });
