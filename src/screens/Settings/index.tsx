import { FormattedMessage } from 'react-intl';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Auth } from 'widgets/Auth';

export const SettingsScreen = () => {
  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Настройки" />}>
      <Auth />
    </ScreenLayout>
  );
};
