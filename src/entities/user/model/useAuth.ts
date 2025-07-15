import { useEffect } from 'react';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import { useAppContext } from 'app/context/useAppContext.ts';
import User = FirebaseAuthTypes.User;

export const useAuth = () => {
  const { setUserAuthProfile } = useAppContext();

  useEffect(() => {
    const handleAuthState = (user: User | null) => {
      setUserAuthProfile(user);
    };

    return onAuthStateChanged(getAuth(), handleAuthState);
  }, [setUserAuthProfile]);
};
