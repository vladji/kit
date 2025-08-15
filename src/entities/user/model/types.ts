import { createTypeGuard } from 'shared/types/lib/fabric.ts';

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

export const isUser = createTypeGuard<UserProps>({
  id: { type: 'string' },
  uniqueId: { type: 'string' },
  deviceData: { type: 'object' },
  createdAt: { type: 'string' },
  updatedAt: { type: 'string' },
  publicName: { type: 'string', optional: true },
  avatarUrl: { type: 'string', optional: true },
  storeId: { type: 'string', optional: true },
});
