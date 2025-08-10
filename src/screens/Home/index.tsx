import { FormattedMessage } from 'react-intl';
import { Search } from 'features/Search';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const HomeTab = () => {
  return (
    <ScreenLayout headerContent={<FormattedMessage defaultMessage="Главная" />}>
      <Search />
    </ScreenLayout>
  );
};
