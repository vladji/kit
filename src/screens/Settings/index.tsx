import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormattedMessage } from 'react-intl';
import { MenuButton } from 'shared/ui/MenuButton';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Auth } from 'widgets/Auth';

export const SettingsScreen = () => {
  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Настройки" />}>
      <Auth />
      {__DEV__ && (
        <MenuButton onPress={() => AsyncStorage.clear()} noBorder>
          <FormattedMessage defaultMessage="Clean storage" />
        </MenuButton>
      )}
    </ScreenLayout>
  );
};
