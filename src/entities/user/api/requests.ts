import api from 'app/api/api.ts';
import { ApiResponse } from 'app/api/types.ts';
import {
  CreateUserDocument,
  UpdateUserProps,
  UserDocumentResponse,
} from 'entities/user/api/types.ts';

export const getUserByUniqueId = (
  uniqueId: string,
): Promise<ApiResponse<UserDocumentResponse>> =>
  api({
    url: `/user/profile/unique/${uniqueId}`,
  });

export const getUserById = (
  id: string | null,
): Promise<ApiResponse<UserDocumentResponse>> =>
  api({
    url: `/user/profile/id/${id}`,
  });

export const createUser = (
  data: CreateUserDocument,
): Promise<ApiResponse<UserDocumentResponse>> =>
  api({
    url: `/user/profile/id`,
    method: 'POST',
    data,
  });

export const updateUser = ({
  id,
  data,
}: UpdateUserProps): Promise<ApiResponse<UserDocumentResponse>> =>
  api({
    url: `/user/profile/id/${id}`,
    method: 'PUT',
    data,
  });
