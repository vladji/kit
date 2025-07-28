export enum UserRoles {
  Client = 'client',
  Store = 'store',
  Admin = 'admin',
  RootAdmin = 'root-admin',
}

export type UserRolesProps = Partial<Record<UserRoles, boolean>>;

interface DeviceDataProps {
  deviceManufacturer: string;
  deviceOs: string;
  deviceId: string;
}

export interface UserProps {
  id: string;
  uniqueId: string;
  deviceData: DeviceDataProps;
  createdAt: Date;
  updatedAt: Date;
  publicName?: string;
  avatarUrl?: string;
  storeId?: string;
}
