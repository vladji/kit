import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';
import { PersistentStoreProps } from 'app/storage/model/types.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export const usePersistentStore = create<PersistentStoreProps>()(
  persist(
    (set, get) => ({
      locale: null,
      theme: lightTheme,
      token: null,
      refreshToken: null,
      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
    }),
    {
      name: 'kit---persistent-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
