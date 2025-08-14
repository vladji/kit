import { ReactNode, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { useShallow } from 'zustand/react/shallow';
import { getDefaultLocale } from 'app/locales/lib/getLocale.ts';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';

export const InitialAppState = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = usePersistentStore(
    useShallow((state) => [state.locale, state.setLocale]),
  );

  useEffect(() => {
    if (!locale) {
      const locale = getDefaultLocale();
      setLocale(locale);
    }
  }, [locale, setLocale]);

  useEffect(() => {
    (async () => {
      await BootSplash.hide({ fade: true });
      return null;
    })();
  }, []);

  return children;
};
