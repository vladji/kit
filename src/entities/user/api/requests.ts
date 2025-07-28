import api from 'app/api/api.ts';
import { ApiResponse } from 'app/api/types.ts';
import {
  CreateUserDocument,
  UpdateUserProps,
} from 'entities/user/api/types.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const getUserByUniqueId = (
  uniqueId: string,
): Promise<ApiResponse<UserProps>> =>
  api({
    url: `/user/profile/unique/${uniqueId}`,
  });

export const getUserById = (
  id: string | null,
): Promise<ApiResponse<UserProps>> =>
  api({
    url: `/user/profile/id/${id}`,
  });

export const createUser = (
  data: CreateUserDocument,
): Promise<ApiResponse<UserProps>> =>
  api({
    url: `/user/profile/id`,
    method: 'POST',
    data,
  });

export const updateUser = ({
  id,
  data,
}: UpdateUserProps): Promise<ApiResponse<UserProps>> =>
  api({
    url: `/user/profile/id/${id}`,
    method: 'PUT',
    data,
  });
