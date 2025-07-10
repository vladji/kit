interface DeviceDataProps {
  deviceManufacturer: string;
  deviceOs: string;
  deviceId: string;
}

export interface UserProps {
  uniqueId: string;
  deviceData: DeviceDataProps;
  storeId?: string;
}
