import { useContext, useEffect } from 'react';
import { AppContext } from 'app/appContext';
import { checkUserUniqueId } from 'app/providers/UserInitialize/lib/checkUserUniqueId.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { ChatProfileProps } from 'entities/chat/model/types.ts';
import { getUserById } from 'entities/user/api/requests.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const useInitialize = () => {
  const { setChatProfile } = useContext(AppContext);

  const { data: userId, isFetched } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UserId,
  );

  useEffect(() => {
    (async () => {
      let user: UserProps | null = null;

      if (!userId && isFetched) {
        user = await checkUserUniqueId();
      }

      if (userId) {
        user = await getUserById(userId);

        if (!user) {
          user = await checkUserUniqueId();
        }
      }

      if (user) {
        const chatProfile: ChatProfileProps = {
          userId: user.id,
          chatName: user.publicName || 'User',
          avatarUrl: user.avatarUrl || null,
        };

        setChatProfile(chatProfile);
      }
    })();
  }, [userId, isFetched, setChatProfile]);
};
