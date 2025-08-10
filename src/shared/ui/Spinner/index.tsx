import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';

export const Spinner = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ActivityIndicator size={32} color={lightTheme.brand} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.main,
    opacity: 0.6,
    zIndex: 14,
  },
});
