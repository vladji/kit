import { StyleSheet, View } from 'react-native';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { COLORS } from 'shared/styles/tokens/colors.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  counter: number;
}

export const CounterBadge = ({ counter }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Typography type="caption" leading={16} color={lightThemeText.light}>
        {counter}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    minWidth: 24,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.DARK_GRAY,
  },
});
