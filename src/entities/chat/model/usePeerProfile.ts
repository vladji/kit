import { useMemo } from 'react';
import { DEFAULT_ADMIN } from 'entities/admin/model/constants.ts';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import {
  ChatMemberProps,
  SupportChatProps,
} from 'entities/chat/model/types.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { useCurrentUser } from 'entities/user/model/useCurrentUser.ts';

interface Props {
  members: ChatMemberProps[];
  support?: SupportChatProps;
}

export const usePeerProfile = ({
  members,
  support,
}: Props): ChatMemberProps => {
  const { userId, roles } = useCurrentUser();
  const { anyAdmin } = useIsAdmin();

  return useMemo<ChatMemberProps>(() => {
    const isClient = !!roles[UserRoles.Client];
    const isStore = !!roles[UserRoles.Store];

    if (anyAdmin) {
      return members.filter(
        (member) =>
          member.role !== UserRoles.Admin &&
          member.role !== UserRoles.RootAdmin,
      )[0];
    }

    if (isStore) {
      return members.filter((member) => member.role !== UserRoles.Store)[0];
    }

    if (isClient) {
      if (support) {
        // if (support.admin) {
        //   return support.admin;
        // }
        return DEFAULT_ADMIN;
      }
      return members.filter((member) => member.id !== userId)[0];
    }

    return {
      id: '',
      role: UserRoles.Client,
      name: 'Unknown',
      avatarUrl: '',
    };
  }, [support, members, userId, anyAdmin, roles]);
};
