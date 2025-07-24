import { useContext, useEffect } from 'react';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import { AppContext } from 'app/appContext';
import User = FirebaseAuthTypes.User;

export const useCheckAuth = () => {
  const { setUserAuthProfile } = useContext(AppContext);

  useEffect(() => {
    const handleAuthState = (user: User | null) => {
      setUserAuthProfile(user);
    };

    return onAuthStateChanged(getAuth(), handleAuthState);
  }, [setUserAuthProfile]);
};
