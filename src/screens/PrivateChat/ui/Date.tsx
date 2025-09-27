import { ReactElement, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { usePersistentStore } from 'app/storage/usePersistentStore.ts';
import { getTodayDate } from 'shared/lib/dates.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  date: string | ReactElement;
}

export const Date = memo(({ date }: Props) => {
  const locale = usePersistentStore((store) => store.locale);
  const todayDate = getTodayDate(locale);
  const dateValue =
    date === todayDate ? <FormattedMessage defaultMessage="Сегодня" /> : date;

  return (
    <View style={styles.wrapper}>
      <Typography
        type="label"
        weight="700"
        color={lightThemeText.light}
        leading={24}
      >
        {dateValue}
      </Typography>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    paddingHorizontal: SPACING.MINI,
    marginVertical: SPACING.MINI_S,
    borderRadius: 111,
    backgroundColor: lightTheme.darkMuted,
  },
});
