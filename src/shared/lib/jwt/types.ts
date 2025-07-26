import { UserRoles } from 'entities/user/model/types.ts';

type TokenUserRoles = Partial<Record<UserRoles, boolean>>;

export interface TokenPayload {
  id: string;
  uniqId: string;
  roles: TokenUserRoles;
  createdAt: number;
}
