import { ReactNode, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { AppContext } from 'app/appContext';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { useMessages } from 'app/locales/useMessages.ts';

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { locale } = useContext(AppContext);
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
