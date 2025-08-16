import { StyleSheet, View } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { storage } from 'app/storage/usePersistentStore.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { MainButton } from 'shared/ui/MainButton';

export const DevSettings = () => {
  return (
    <View style={styles.wrapper}>
      <MainButton onPress={() => storage.clearAll()} variant="outline">
        <FormattedMessage defaultMessage="Clean storage" />
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: SPACING.DEFAULT,
    right: SPACING.DEFAULT,
    bottom: SPACING.BIG,
    gap: SPACING.DEFAULT,
  },
});
