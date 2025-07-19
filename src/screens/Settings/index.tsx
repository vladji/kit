import { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { AppContext } from 'app/context';
import { SettingsAuth } from 'screens/Settings/ui/Auth.tsx';
import { Contacts } from 'screens/Settings/ui/Contacts.tsx';
import { DevSettings } from 'screens/Settings/ui/DevSettings.tsx';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';

export const SettingsScreen = () => {
  const { rootAdmin } = useContext(AppContext);

  const showAuthBlock = !rootAdmin;
  const contactsBlock = !rootAdmin;

  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Настройки" />}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {showAuthBlock && <SettingsAuth />}
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
