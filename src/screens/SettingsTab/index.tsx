import { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { AppContext } from 'app/appContext';
import { SettingsAuth } from 'screens/SettingsTab/ui/Auth.tsx';
import { Contacts } from 'screens/SettingsTab/ui/Contacts.tsx';
import { DevSettings } from 'screens/SettingsTab/ui/DevSettings.tsx';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';

export const SettingsTab = () => {
  const { admin, rootAdmin } = useContext(AppContext);
  const anyAdmin = rootAdmin || admin;

  const contactsBlock = !anyAdmin;

  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Настройки" />}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SettingsAuth />
        {contactsBlock && <Contacts />}
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
