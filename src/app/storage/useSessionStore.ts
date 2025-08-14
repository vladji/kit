import { create } from 'zustand/index';
import { SessionStateProps } from 'app/storage/model/types.ts';
import { UserRoles } from 'entities/user/model/types.ts';

export const useSessionStore = create<SessionStateProps>((set) => ({
  roles: { [UserRoles.Client]: true },
  userProfile: null,
  adminProfile: null,
  storeProfile: null,
  setRoles: (roles) => set({ roles }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setAdminProfile: (adminProfile) => set({ adminProfile }),
  setStoreProfile: (storeProfile) => set({ storeProfile }),
}));
