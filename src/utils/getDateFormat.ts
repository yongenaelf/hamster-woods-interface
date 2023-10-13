import { format, parseISO } from 'date-fns';

/**
 * Simple utility to format an ISO datestring.
 * @param dateStr Datestring in ISO format
 * @param formatStr See https://date-fns.org/v2.30.0/docs/format
 * @returns formatted datestring
 */
export const getDateFormat = (dateStr: string, formatStr: string) => {
  const date = parseISO(dateStr);

  return format(date, formatStr);
};
