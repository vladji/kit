import { isAdmin } from 'entities/admin/model/types.ts';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { ChatMemberProps } from 'entities/chat/model/types.ts';
import { isStore } from 'entities/store/model/types.ts';
import { UserRoles, isUser } from 'entities/user/model/types.ts';
import { useCurrentUser } from 'entities/user/model/useCurrentUser.ts';

export const useSelfProfile = (): ChatMemberProps | null => {
  const { userId, profile, roles } = useCurrentUser();
  const { anyAdmin } = useIsAdmin();

  if (!userId || !profile) {
    return null;
  }

  if (anyAdmin && isAdmin(profile)) {
    return {
      id: userId,
      role: UserRoles.Admin,
      name: profile.name || 'Admin',
      avatarUrl: profile.avatarUrl || null,
    };
  }

  if (roles[UserRoles.Store] && isStore(profile)) {
    return {
      id: userId,
      role: UserRoles.Store,
      name: profile.storeName || 'Store',
      avatarUrl: profile.storeAvatarUrl || null,
    };
  }

  if (roles[UserRoles.Client] && isUser(profile)) {
    return {
      id: userId,
      role: UserRoles.Client,
      name: profile.publicName || 'User',
      avatarUrl: profile?.avatarUrl || null,
    };
  }

  return null;
};
