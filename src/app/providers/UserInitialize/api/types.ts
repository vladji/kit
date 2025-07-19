import { UserProps } from 'entities/user/model/types.ts';

export interface UserByUniqueIdRequest {
  uniqueId: string;
}

export type CreateUserDocument = Omit<
  UserProps,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface UserDocumentResponse {
  user: UserProps | null;
}
