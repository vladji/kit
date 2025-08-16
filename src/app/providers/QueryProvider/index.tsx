import type { ReactNode } from 'react';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useRefetchOnAppStateActive } from 'app/providers/QueryProvider/lib/refetchOnAppStateActive.ts';
import { queryStorage } from 'app/storage/usePersistentStore.ts';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const storagePersister = createAsyncStoragePersister({
  storage: queryStorage,
});

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  useRefetchOnAppStateActive();
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: storagePersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
