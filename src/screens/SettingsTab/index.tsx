import { ScrollView, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { SettingsAuth } from 'screens/SettingsTab/ui/Auth.tsx';
import { Contacts } from 'screens/SettingsTab/ui/Contacts.tsx';
import { DevSettings } from 'screens/SettingsTab/ui/DevSettings.tsx';
import { useIsAdmin } from 'shared/hooks/useIsAdmin.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';

export const SettingsTab = () => {
  const { anyAdmin } = useIsAdmin();

  const showContacts = !anyAdmin;

  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Настройки" />}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SettingsAuth />
        {showContacts && <Contacts />}
      </ScrollView>
      {__DEV__ && <DevSettings />}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    gap: Sizes.Big,
  },
});
