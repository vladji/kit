import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextProvider } from 'app/providers/Context';
import { LocaleProvider } from 'app/providers/Locale';
import { TanStackQuery } from 'app/providers/TanStackQuery';
import { UserInitialize } from 'app/providers/UserInitialize';
import RootRouter from 'app/router/RootRouter';
import { AppLayout } from 'widgets/AppLayout';
import { ErrorFallback } from 'widgets/ErrorFallback';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ContextProvider>
        <LocaleProvider>
          <TanStackQuery>
            <SafeAreaProvider>
              <UserInitialize>
                <AppLayout>
                  <RootRouter />
                </AppLayout>
              </UserInitialize>
            </SafeAreaProvider>
          </TanStackQuery>
        </LocaleProvider>
      </ContextProvider>
    </ErrorBoundary>
  );
}

export default App;
