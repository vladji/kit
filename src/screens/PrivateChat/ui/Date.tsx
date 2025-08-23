import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  date: string;
}

export const Date = memo(({ date }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Typography
        type="label"
        weight="700"
        color={lightThemeText.light}
        leading={24}
      >
        {date}
      </Typography>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    paddingHorizontal: SPACING.MINI,
    marginVertical: SPACING.MINI_S,
    borderRadius: 888,
    backgroundColor: lightTheme.darkMuted,
  },
});
