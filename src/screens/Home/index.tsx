import { FormattedMessage } from 'react-intl';
import { Search } from 'features/Search';
import { ScreenLayout } from 'shared/ui/ScreenLayout';

export const HomeTab = () => {
  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Главная" />}>
      <Search />
    </ScreenLayout>
  );
};
