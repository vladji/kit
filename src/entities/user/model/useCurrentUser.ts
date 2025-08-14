import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSessionStore } from 'app/storage/useSessionStore.ts';
import { UserRoles } from 'entities/user/model/types.ts';

export const useCurrentUser = () => {
  const [roles, userProfile, adminProfile, storeProfile] = useSessionStore(
    useShallow((state) => [
      state.roles,
      state.userProfile,
      state.adminProfile,
      state.storeProfile,
    ]),
  );

  return useMemo(() => {
    if (roles[UserRoles.Client] && userProfile?.id) {
      return {
        roles,
        userId: userProfile.id,
        profile: userProfile,
      };
    }

    if (
      (roles[UserRoles.Admin] || roles[UserRoles.RootAdmin]) &&
      adminProfile?.id
    ) {
      return {
        roles,
        userId: adminProfile.id,
        profile: adminProfile,
      };
    }

    if (roles[UserRoles.Store] && storeProfile?.id) {
      return {
        roles,
        userId: storeProfile.id,
        profile: storeProfile,
      };
    }

    return {
      roles,
      userId: null,
      profile: null,
    };
  }, [roles, userProfile, adminProfile, storeProfile]);
};
