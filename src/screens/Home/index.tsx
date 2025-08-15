import { StyleSheet, View } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Search } from 'features/Search';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const HomeTab = () => {
  return (
    <ScreenLayout headerContent={<FormattedMessage defaultMessage="Главная" />}>
      <View style={styles.content}>
        <Search />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.DEFAULT,
  },
});
