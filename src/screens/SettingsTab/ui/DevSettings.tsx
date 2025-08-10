import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormattedMessage } from 'react-intl';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { MainButton } from 'shared/ui/MainButton';

export const DevSettings = () => {
  return (
    <View style={styles.wrapper}>
      <MainButton onPress={() => AsyncStorage.clear()} variant="outline">
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
