import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useSessionStore } from 'app/storage/useSessionStore.ts';
import { getAdmin } from 'entities/admin/api/requests.ts';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { getTokenPayload } from 'shared/lib/jwt/getTokenPayload.ts';

export const useInitializeAdmin = () => {
  const [adminProfile, setAdminProfile] = useSessionStore(
    useShallow((store) => [store.adminProfile, store.setAdminProfile]),
  );
  const token = usePersistentStore((store) => store.token);
  const { anyAdmin } = useIsAdmin();

  useEffect(() => {
    (async () => {
      try {
        if (token && anyAdmin && !adminProfile) {
          const payload = getTokenPayload(token);
          const adminId = payload?.id;

          if (adminId) {
            const profile = await getAdmin(adminId);
            setAdminProfile(profile);
          }
        }
      } catch {
        Alert.alert('Error', 'while get user admin profile');
      }
    })();
  }, [token, anyAdmin, adminProfile, setAdminProfile]);
};
