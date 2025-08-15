export const getHhMm = (ISODate: string) => {
  try {
    const date = Date.parse(ISODate);
    if (isNaN(date)) return '';
    const hours = String(new Date(date).getHours()).padStart(2, '0');
    const minutes = String(new Date(date).getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch {
    return '';
  }
};
