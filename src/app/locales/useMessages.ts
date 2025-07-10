import { Locales } from 'app/locales/types.ts';
import EnMessages from './compiled/en.json';
import RuMessages from './compiled/ru.json';

export const useMessages = (locale: Locales) => {
  const messages = {
    [Locales.RU]: RuMessages,
    [Locales.EN]: EnMessages,
  };
  return messages[locale];
};
