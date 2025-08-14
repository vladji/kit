import { ScrollView, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { SettingsAuth } from 'screens/SettingsTab/ui/Auth.tsx';
import { Contacts } from 'screens/SettingsTab/ui/Contacts.tsx';
import { DevSettings } from 'screens/SettingsTab/ui/DevSettings.tsx';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const SettingsTab = () => {
  const { anyAdmin } = useIsAdmin();

  const showContacts = !anyAdmin;

  return (
    <ScreenLayout
      headerContent={<FormattedMessage defaultMessage="Настройки" />}
    >
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
    gap: SPACING.BIG,
  },
});
