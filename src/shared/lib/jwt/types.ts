import { UserRoles } from 'entities/user/model/types.ts';

type TokenUserRoles = Partial<Record<UserRoles, boolean>>;

export interface TokenPayload {
  uniqId: string;
  roles: TokenUserRoles;
  createdAt: number;
}
