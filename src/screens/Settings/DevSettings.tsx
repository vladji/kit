import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormattedMessage } from 'react-intl';
import { useAppContext } from 'app/context/useAppContext.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { MainButton } from 'shared/ui/MainButton';
import { SwitchItem } from 'shared/ui/SwitchItem';

export const DevSettings = () => {
  const { rootAdmin, setRootAdmin } = useAppContext();
  const onSuperAdminPress = () => {
    setRootAdmin((prev) => !prev);
  };

  return (
    <View style={styles.wrapper}>
      <MainButton onPress={() => AsyncStorage.clear()} variant="outline">
        <FormattedMessage defaultMessage="Clean storage" />
      </MainButton>
      <SwitchItem
        title="Root Admin"
        value={rootAdmin}
        onValueChange={onSuperAdminPress}
      />
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
