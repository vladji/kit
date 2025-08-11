import { UserProps } from 'entities/user/model/types.ts';

export interface UserByIdRequest {
  userId: string;
}

export type CreateUserDocument = Omit<
  UserProps,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface UpdateUserProps {
  id: string;
  data: CreateUserDocument;
}
