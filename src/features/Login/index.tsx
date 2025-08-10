import { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppleLogin } from 'features/AppleLogin';
import { GoogleLogin } from 'features/GoogleLogin';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { BottomSheet } from 'shared/ui/BottomSheet';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const Login: FC<Props> = memo(({ show, onClose }) => {
  return (
    <BottomSheet show={show} onClose={onClose}>
      <View style={styles.wrapper}>
        <AppleLogin />
        <GoogleLogin />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.DEFAULT,
  },
});
