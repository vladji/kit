import { FormattedMessage } from 'react-intl';
import { DevSettings } from 'screens/Settings/DevSettings.tsx';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { SettingsAuth } from 'widgets/SettingsAuth';

export const SettingsScreen = () => {
  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Настройки" />}>
      <SettingsAuth />
      {__DEV__ && <DevSettings />}
    </ScreenLayout>
  );
};
