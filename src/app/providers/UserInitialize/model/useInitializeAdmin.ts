import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { useSessionStore } from 'app/storage/useSessionStore.ts';
import { getAdmin } from 'entities/admin/api/requests.ts';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { getTokenPayload } from 'entities/auth/getTokenPayload.ts';

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
        console.warn('Error while get admin profile');
      }
    })();
  }, [token, anyAdmin, adminProfile, setAdminProfile]);
};
