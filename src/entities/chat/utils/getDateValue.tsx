import { FormattedMessage } from 'react-intl';
import { Locales } from 'app/locales/types.ts';
import { getTodayDate } from 'shared/lib/dates.ts';

export const getDateValue = (locale: Locales | null, date: string) => {
  const todayDate = getTodayDate(locale);
  return date === todayDate ? (
    <FormattedMessage defaultMessage="Сегодня" />
  ) : (
    date
  );
};
