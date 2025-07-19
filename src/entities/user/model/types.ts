interface DeviceDataProps {
  deviceManufacturer: string;
  deviceOs: string;
  deviceId: string;
}

export interface UserProps {
  id: string;
  uniqueId: string;
  type: 'client' | 'store';
  deviceData: DeviceDataProps;
  storeId?: string;
}
