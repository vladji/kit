import { UserRolesProps } from 'entities/user/model/types.ts';

export interface TokenPayload {
  id: string;
  uniqId: string;
  roles: UserRolesProps;
  createdAt: number;
}
