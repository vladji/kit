import { UserProps } from 'entities/user/model/types.ts';

export interface UserByUniqueIdRequest {
  uniqueId: string;
}

export interface UserByUniqueIdResponse {
  user: UserProps | null;
}
