import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

/**
 * Simple utility to format an ISO datestring.
 * @param dateStr Datestring in ISO format
 * @param formatStr See https://date-fns.org/v2.30.0/docs/format
 * @returns formatted datestring
 */
export const getDateFormat = (dateStr: string, formatStr: string, tz = 'UTC') => {
  const date = parseISO(dateStr);

  return formatInTimeZone(date, tz, formatStr);
};
