import { create } from 'zustand/index';
import { AdminProps } from 'entities/admin/model/types.ts';
import { StoreProps } from 'entities/store/model/types.ts';
import {
  UserProps,
  UserRoles,
  UserRolesProps,
} from 'entities/user/model/types.ts';

interface SessionStateProps {
  roles: UserRolesProps;
  userProfile: UserProps | null;
  adminProfile: AdminProps | null;
  storeProfile: StoreProps | null;
  setRoles: (roles: UserRolesProps) => void;
  setUserProfile: (profile: UserProps | null) => void;
  setAdminProfile: (profile: AdminProps | null) => void;
  setStoreProfile: (profile: StoreProps | null) => void;
}

const useSessionStore = create<SessionStateProps>((set) => ({
  roles: { [UserRoles.Client]: true },
  userProfile: null,
  adminProfile: null,
  storeProfile: null,
  setRoles: (roles) => set({ roles }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setAdminProfile: (adminProfile) => set({ adminProfile }),
  setStoreProfile: (storeProfile) => set({ storeProfile }),
}));
