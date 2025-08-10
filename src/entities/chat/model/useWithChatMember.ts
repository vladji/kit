import { useContext, useMemo } from 'react';
import { AppContext } from 'app/appContext';
import { DEFAULT_ADMIN } from 'entities/admin/model/constants.ts';
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

  return useMemo<ChatMemberProps>(() => {
    if (!userId) {
      return {
        id: '',
        role: UserRoles.Client,
        name: 'Unknown',
        avatarUrl: '',
      };
    }

    if (anyAdmin) {
      return members.filter(
        (member) =>
          member.role !== UserRoles.Admin &&
          member.role !== UserRoles.RootAdmin,
      )[0];
    }

    if (roles[UserRoles.Store]) {
      return members.filter((member) => member.role !== UserRoles.Store)[0];
    }

    if (support) {
      if (support.admin) {
        return support.admin;
      }
      return DEFAULT_ADMIN;
    }

    return members.filter((member) => member.id !== userId)[0];
  }, [support, members, userId, anyAdmin, roles]);
};
