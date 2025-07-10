import api from 'app/api/axios.ts';
import { ApiResponse } from 'app/api/types.ts';
import { UserByUniqueIdResponse } from 'entities/user/api/types.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const getUserByUniqueId = (
  uniqueId: string,
): Promise<ApiResponse<UserByUniqueIdResponse>> =>
  api({
    url: `/user/profile/unique-id?uniqueId=${uniqueId}`,
  });

export const createUser = (
  data: UserProps,
): Promise<ApiResponse<UserByUniqueIdResponse>> =>
  api({
    url: `/user/profile/unique-id`,
    method: 'POST',
    data,
  });
