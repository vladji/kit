import { useContext, useEffect } from 'react';
import { AppContext } from 'app/appContext';
import { useGetUserById } from 'entities/user/api/useGetUserById.ts';
import { UserPublicProfileProps } from 'entities/user/model/types.ts';

export const useSetPublicProfile = () => {
  const { setUserPublicProfile } = useContext(AppContext);
  const { data } = useGetUserById();

  useEffect(() => {
    if (data) {
      const publicProfile: UserPublicProfileProps = {
        publicName: data.user?.publicName || null,
        avatarUrl: data.user?.avatarUrl || null,
      };
      setUserPublicProfile(publicProfile);
    }
  }, [data, setUserPublicProfile]);
};
