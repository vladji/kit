import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { AdminChatTabsNames, TabsNames } from 'app/router/Tabs/types.ts';

export const chatTabsNames: Record<TabsNames, ReactElement> = {
  [AdminChatTabsNames.Clients]: <FormattedMessage defaultMessage="Клиенты" />,
  [AdminChatTabsNames.Stores]: <FormattedMessage defaultMessage="Бизнес" />,
};
