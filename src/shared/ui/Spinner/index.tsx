import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BRAND_COLOR } from 'shared/styles/constants/colors.ts';
import { useStyles } from 'shared/styles/useStyles.ts';

// import { BlurredView } from 'shared/ui/BlurredView';

interface Props {
  isVisible?: boolean;
}

export const Spinner = ({ isVisible = true }: Props) => {
  const { colors } = useStyles();
  return (
    <>
      {isVisible && (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
          <View
            style={[StyleSheet.absoluteFill, styles.background, colors().main]}
          />
          <ActivityIndicator
            style={styles.indicator}
            size={32}
            color={BRAND_COLOR}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 14,
  },
  background: {
    opacity: 0.6,
    zIndex: 1,
  },
  indicator: {
    zIndex: 2,
  },
});
