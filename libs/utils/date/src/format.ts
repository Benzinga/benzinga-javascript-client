import { DateTime } from 'luxon';
import parse from 'date-fns/parse';
import { TimeFormatOptions } from './bzDateTime';

export const getTimeDisplayFormat = (options: TimeFormatOptions) => {
  const { includeZero, timeFormat = '24-hour', withoutSeconds, withoutSpace } = options ?? {};
  let hours = timeFormat === '24-hour' ? 'H' : 'h';
  if (includeZero) {
    hours += hours;
  }
  const space = withoutSpace || timeFormat === '24-hour' ? '' : ' ';
  const ss = withoutSeconds ? '' : ':ss';
  const formatSuffix = timeFormat === '24-hour' ? '' : 'a';
  return `${hours}:mm${ss}${space}${formatSuffix}`;
};

export const parseDateTime = (dateTime: Date | string) =>
  typeof dateTime === 'string' ? parse(dateTime.replace(' UTC', ''), 'yyyy-MM-dd HH:mm', new Date()) : dateTime;

export const formatDateTime = (dateTime: Date | string) => {
  const date = formatDate(dateTime);
  const time = formatTime(dateTime);
  return `${date}, ${time}`;
};

export const formatDate = (dateTime: Date | string, seperator = '/') => {
  const date = parseDateTime(dateTime);
  const year = date.getFullYear().toString().substr(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}${seperator}${day}${seperator}${year}`;
};

export const formatTime = (dateTime: Date | string) => {
  const date = parseDateTime(dateTime);
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  const suffix = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes.padStart(2, '0');

  return `${hours}:${minutes} ${suffix}`;
};

export const formatDatePretty = (dateString: string) => {
  const date = DateTime.fromISO(dateString);
  const month = date.toLocaleString({ month: 'long' });
  const day = date.toLocaleString({ day: 'numeric' });
  const year = date.toLocaleString({ year: 'numeric' });
  return `${month} ${day}, ${year}`;
};
