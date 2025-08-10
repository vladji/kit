import { useCallback, useContext, useEffect } from 'react';
import { AppContext } from 'app/appContext';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { useGetAdmin } from 'entities/admin/api/useGetAdmin.ts';
import { ChatProfileProps } from 'entities/chat/model/types.ts';
import { useGetStore } from 'entities/store/api/useGetStore.ts';
import { useGetUserById } from 'entities/user/api/useGetUserById.ts';
import { UserRoles } from 'entities/user/model/types.ts';
import { useIsAdmin } from 'shared/hooks/useIsAdmin.ts';

export const useSetChatProfile = () => {
  const { data: userId } = useGetAsyncStorage<string>(AsyncStorageKeys.UserId);
  const { roles, setChatProfile } = useContext(AppContext);
  const { anyAdmin } = useIsAdmin();
  const { getUserById } = useGetUserById();
  const { getAdmin } = useGetAdmin();
  const { getStore } = useGetStore();

  const setUserProfile = useCallback(
    async (userId: string) => {
      const user = await getUserById({ userId });
      const chatProfile: ChatProfileProps = {
        userId,
        chatName: user.publicName || 'User',
        avatarUrl: user.avatarUrl || null,
      };
      setChatProfile(chatProfile);
    },
    [getUserById, setChatProfile],
  );

  const setAdminProfile = useCallback(
    async (userId: string) => {
      const admin = await getAdmin({ adminId: userId });
      const chatProfile: ChatProfileProps = {
        userId,
        chatName: admin.name || 'Admin',
        avatarUrl: null,
      };
      setChatProfile(chatProfile);
    },
    [getAdmin, setChatProfile],
  );

  const setStoreProfile = useCallback(
    async (userId: string) => {
      const store = await getStore({ storeId: userId });
      const chatProfile: ChatProfileProps = {
        userId,
        chatName: store.storeName || 'Store',
        avatarUrl: store.storeAvatarUrl || null,
      };
      setChatProfile(chatProfile);
    },
    [getStore, setChatProfile],
  );

  useEffect(() => {
    if (userId) {
      if (anyAdmin) {
        setAdminProfile(userId);
        return;
      }

      if (roles[UserRoles.Store]) {
        setStoreProfile(userId);
        return;
      }

      setUserProfile(userId);
    }
  }, [
    userId,
    anyAdmin,
    roles,
    setUserProfile,
    setAdminProfile,
    setStoreProfile,
  ]);
};
