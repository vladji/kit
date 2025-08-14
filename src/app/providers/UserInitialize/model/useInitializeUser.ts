import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { checkUser } from 'app/providers/UserInitialize/lib/checkUser.ts';
import { useSessionStore } from 'app/storage/useSessionStore.ts';

export const useInitializeUser = () => {
  const [userProfile, setUserProfile] = useSessionStore(
    useShallow((store) => [store.userProfile, store.setUserProfile]),
  );

  useEffect(() => {
    (async () => {
      try {
        if (!userProfile) {
          const user = await checkUser();
          if (user) {
            setUserProfile(user);
          }
        }
      } catch {
        Alert.alert('Error', 'while get user profile');
      }
    })();
  }, [userProfile, setUserProfile]);
};
