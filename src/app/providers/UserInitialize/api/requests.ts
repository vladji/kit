import api from 'app/api/axios.ts';
import { ApiResponse } from 'app/api/types.ts';
import {
  CreateUserDocument,
  UserDocumentResponse,
} from 'app/providers/UserInitialize/api/types.ts';

export const getUserByUniqueId = (
  uniqueId: string,
): Promise<ApiResponse<UserDocumentResponse>> =>
  api({
    url: `/user/profile/unique-id?uniqueId=${uniqueId}`,
  });

export const createUser = (
  data: CreateUserDocument,
): Promise<ApiResponse<UserDocumentResponse>> =>
  api({
    url: `/user/profile/db-id`,
    method: 'POST',
    data,
  });
