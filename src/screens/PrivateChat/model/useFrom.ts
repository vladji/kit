import { useContext } from 'react';
import { AppContext } from 'app/appContext';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { ChatMemberProps } from 'entities/chat/model/types.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { useIsAdmin } from 'shared/hooks/useIsAdmin.ts';

export const useFrom = (): ChatMemberProps | null => {
  const { data: userId } = useGetAsyncStorage<string>(AsyncStorageKeys.UserId);
  const { roles, chatProfile } = useContext(AppContext);
  const { anyAdmin } = useIsAdmin();

  if (!userId) {
    return null;
  }

  if (anyAdmin) {
    return {
      id: userId,
      role: UserRoles.Admin,
      name: chatProfile?.chatName || 'Admin',
      avatarUrl: chatProfile?.avatarUrl || null,
    };
  }

  if (roles[UserRoles.Store]) {
    return {
      id: userId,
      role: UserRoles.Store,
      name: chatProfile?.chatName || 'Store',
      avatarUrl: chatProfile?.avatarUrl || null,
    };
  }

  return {
    id: userId,
    role: UserRoles.Client,
    name: chatProfile?.chatName || 'User',
    avatarUrl: chatProfile?.avatarUrl || null,
  };
};
