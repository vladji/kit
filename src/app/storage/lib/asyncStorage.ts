import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const getAsyncStorageValue = async <T>(
  key: AsyncStorageKeys,
): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch {
    return null;
  }
};

export const setAsyncStorageValue = async <T>(
  key: AsyncStorageKeys,
  value: T,
): Promise<void | null> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch {
    return null;
  }
};
