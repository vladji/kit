import { Locales, localeMap } from 'app/locales/types.ts';

export const getHhMm = (ISODate: string) => {
  try {
    const timestamp = Date.parse(ISODate);
    if (isNaN(timestamp)) return '';
    const hours = String(new Date(timestamp).getHours()).padStart(2, '0');
    const minutes = String(new Date(timestamp).getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch {
    return '';
  }
};

export const getTodayDate = (locale: Locales | null) => {
  const formatted = new Intl.DateTimeFormat(localeMap[locale || Locales.EN], {
    day: 'numeric',
    month: 'long',
  });
  return formatted.format(new Date());
};

export const getDate = (locale: Locales | null, ISODate?: string) => {
  try {
    if (!ISODate) return '';
    const timestamp = Date.parse(ISODate);

    if (isNaN(timestamp)) return '';

    const intlFormatted = new Intl.DateTimeFormat(
      localeMap[locale || Locales.EN],
      {
        day: 'numeric',
        month: 'long',
      },
    );

    if (!intlFormatted) return '';

    return intlFormatted.format(new Date(timestamp));
  } catch {
    return '';
  }
};
