import { useContext, useMemo } from 'react';
import { AppContext } from 'app/appContext';
import { ADMIN_PLACEHOLDER_AVATAR_URL } from 'entities/admin/model/constants.ts';
import {
  ChatMemberProps,
  SupportChatProps,
} from 'entities/chat/model/types.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { useIsAdmin } from 'shared/hooks/useIsAdmin.ts';

interface Props {
  members: ChatMemberProps[];
  support?: SupportChatProps;
}

export const useWithChatMember = ({ members, support }: Props) => {
  const { chatProfile, roles } = useContext(AppContext);
  const { anyAdmin } = useIsAdmin();
  const userId = chatProfile?.userId;

  return useMemo(() => {
    if (!userId) {
      return {
        name: 'Unknown',
        avatar: '',
      };
    }

    if (anyAdmin) {
      const filtered = members.filter(
        (member) =>
          member.role !== UserRoles.Admin &&
          member.role !== UserRoles.RootAdmin,
      )[0];

      return {
        name: filtered.name,
        avatar: filtered.avatarUrl,
      };
    }

    if (roles[UserRoles.Store]) {
      const filtered = members.filter(
        (member) => member.role !== UserRoles.Store,
      )[0];

      return {
        name: filtered.name,
        avatar: filtered.avatarUrl,
      };
    }

    if (support) {
      if (support.admin) {
        return {
          name: support.admin.name,
          avatar: support.admin.avatarUrl,
        };
      }
      return {
        name: 'Admin',
        avatar: ADMIN_PLACEHOLDER_AVATAR_URL,
      };
    }

    const member = members.filter((member) => member.id !== userId)[0];

    return {
      name: member.name,
      avatar: member.avatarUrl,
    };
  }, [support, members, userId, anyAdmin, roles]);
};
