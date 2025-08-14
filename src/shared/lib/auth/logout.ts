import { Alert } from 'react-native';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useSessionStore } from 'app/storage/useSessionStore.ts';

export const logout = async () => {
  usePersistentStore.setState({ token: null, refreshToken: null });
  useSessionStore.setState({ adminProfile: null, storeProfile: null });

  Alert.alert('Logout', 'Successfully logged out');
};
