import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';
import { Locales } from 'app/locales/types.ts';
import { ThemeType, lightTheme } from 'shared/styles/theme/theme.ts';

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

interface PersistStoreProps {
  locale: Locales | null;
  theme: ThemeType;
  token: string | null;
  refreshToken: string | null;
  setLocale: (locale: Locales) => void;
  setTheme: (theme: ThemeType) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
}

export const usePersistStore = create<PersistStoreProps>()(
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
