import { DateTime } from 'luxon';

const TIMEZONE = 'America/New_York';

export const formatEDT = (timestamp: number) => DateTime.fromMillis(timestamp).setZone(TIMEZONE).toFormat('h:mma');
export const formatAfterHours = (timestamp: number) =>
  DateTime.fromMillis(timestamp).setZone(TIMEZONE).toFormat('MMM d');

export const isToday = (date: string): boolean => {
  const now = DateTime.local();
  const datetime = DateTime.fromFormat(`${date}`, 'yyyy-MM-dd');
  const isToday = datetime.hasSame(now, 'day');
  return isToday;
};

export const isTodayDate = (date: Date): boolean => {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

// timestamp of last easter timezone midnight
export const getMidNightAtTimeZone = (timeZone = 'America/New_York') => {
  const now = new Date();
  const time = now.getTime();
  const nowInTimezone = new Date(
    now.toLocaleString('en-US', {
      timeZone,
    }),
  ).getTime();
  const midnight = new Date(nowInTimezone).setHours(0, 0, 0, 0);
  return Math.floor((midnight + (time - nowInTimezone)) / 1000);
};
