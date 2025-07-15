import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreKeys } from 'app/store/model/types.ts';

export const getStoreValue = async <T>(key: StoreKeys): Promise<T | null> => {
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

export const setStoreValue = async <T>(
  key: StoreKeys,
  value: T,
): Promise<void | null> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch {
    return null;
  }
};
