interface DeviceDataProps {
  deviceManufacturer: string;
  deviceOs: string;
  deviceId: string;
}

interface AdminProps {
  chatEnabled: boolean;
  chatNotificationEnabled: boolean;
}

export interface UserProps {
  id: string;
  uniqueId: string;
  deviceData: DeviceDataProps;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  avatar?: string;
  admin?: AdminProps;
  storeId?: string;
}
