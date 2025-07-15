interface DeviceDataProps {
  deviceManufacturer: string;
  deviceOs: string;
  deviceId: string;
}

export interface UserProps {
  type: 'client' | 'store';
  uniqueId: string;
  deviceData: DeviceDataProps;
  storeId?: string;
}
