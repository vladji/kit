import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormattedMessage } from 'react-intl';
import { Sizes } from 'shared/styles/constants/sizes.ts';
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
    left: Sizes.Default,
    right: Sizes.Default,
    bottom: Sizes.Big,
    gap: Sizes.Default,
  },
});
