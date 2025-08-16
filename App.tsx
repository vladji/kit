import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InitialAppState } from 'app/providers/InitialAppState';
import { LocaleProvider } from 'app/providers/Locale';
import { QueryProvider } from 'app/providers/QueryProvider';
import { SocketConnect } from 'app/providers/Socket';
import { UserInitialize } from 'app/providers/UserInitialize';
import RootRouter from 'app/router/RootRouter';
import { ErrorFallback } from 'widgets/ErrorFallback';
import 'app/storage/usePersistentStore.ts';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <InitialAppState>
          <LocaleProvider>
            <QueryProvider>
              <SafeAreaProvider>
                <UserInitialize>
                  <SocketConnect>
                    <RootRouter />
                  </SocketConnect>
                </UserInitialize>
              </SafeAreaProvider>
            </QueryProvider>
          </LocaleProvider>
        </InitialAppState>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

export default App;
