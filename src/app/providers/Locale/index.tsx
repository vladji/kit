import { ReactNode, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'app/config/constants.ts';
import { AppContext } from 'app/context';
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
