import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { useMessages } from 'app/locales/useMessages.ts';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const locale = usePersistentStore((state) => state.locale) || DEFAULT_LOCALE;
  const messages = useMessages(locale);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
      onError={() => null}
    >
      {children}
    </IntlProvider>
  );
};
