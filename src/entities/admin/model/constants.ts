import { CHAT_SUPPORT } from 'entities/chat/model/constants.ts';
import { ChatMemberProps } from 'entities/chat/model/types.ts';
import { UserRoles } from 'entities/user/model/types.ts';

export const ADMIN_PLACEHOLDER_AVATAR_URL =
  'https://imagedelivery.net/40N2K09w9ulyPD-xWr2tcg/9f4cb715-c6a8-4eb9-eb2b-b5266b091f00/avatar';

export const DEFAULT_ADMIN: ChatMemberProps = {
  id: CHAT_SUPPORT,
  role: UserRoles.Admin,
  name: 'Admin',
  avatarUrl: ADMIN_PLACEHOLDER_AVATAR_URL,
};
