type TimeKey = 'seconds' & 'minutes' & 'hours' & 'days';
export type TimeFormat = 'AM/PM' | '24-hour';

export interface TimeFormatOptions {
  timeFormat?: TimeFormat;
  withoutSeconds?: boolean;
  withoutSpace?: boolean;
  includeZero?: boolean;
}

type Duration = {
  [key in TimeKey]: number;
};

const DEFAULT_TIME = '00:00:00';
/* eslint-disable sort-keys */
const msMultiplier: Record<TimeKey, number> = {
  day: 86400000,
  days: 86400000,
  hour: 3600000,
  hours: 3600000,
  minute: 60000,
  minutes: 60000,
  second: 1000,
  seconds: 1000,
};

/**
 * This class provides methods for date and time management:
 * formatting, comparing and adding dates
 *
 * @remarks
 * Class extends Date object
 */
export class BzDateTime extends Date {
  /**
   * @returns current date
   */
  static dateNow = (): BzDateTime => new BzDateTime(new Date());

  /**
   * Creates DateTime object from Date
   *
   * @remarks
   * it actually extends Date object with DateTime methods
   */
  static fromDate = (dateTime: Date): BzDateTime => new BzDateTime(dateTime);

  /**
   * Creates DateTime object from Date
   *
   * @remarks
   * it extends Date object with DateTime methods and offsets locale
   */
  static fromLocaleDate = (date: Date): BzDateTime => {
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return new BzDateTime(utcDate);
  };

  /**
   * Creates DateTime object from Date
   *
   * @remarks
   * it extends Date object with DateTime methods and adds offset to transform UTC into locale
   */
  static fromUTCToLocale = (date: Date): BzDateTime => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    return new BzDateTime(utcDate);
  };

  /**
   * @param dateString - it accepts ISO string formats e.g. YYYY-MM-DD or YYYYMMDD
   * @param time - it accepts time formats e.g. HH:mm:ss or HH:mm
   * @param timezone - it accepts time zone e.g. -HH:mm
   *
   * @returns DateTime object
   */
  static fromISO = (dateString: string | undefined | null, time: string = DEFAULT_TIME, timezone = ''): BzDateTime => {
    const dateTime = dateString ? new Date(`${dateString}T${time}${timezone}`) : undefined;
    return dateTime ? new BzDateTime(dateTime) : new BzDateTime();
  };

  /**
   * @param dateString - it accepts number | string | Date | undefined | null
   *
   * @returns DateTime object
   */

  static from = (date: number | string | Date | undefined | null): BzDateTime => {
    const dateTime = date ? new Date(date) : undefined;
    return dateTime ? new BzDateTime(dateTime) : new BzDateTime();
  };

  /**
   * @param time - accepts string in h:mm:ss a | h:mm a | h:mm:ssa | h:mma | H:mm:ss | H:mm format
   *
   * @returns DateTime object
   */

  static fromTime = (time: string = DEFAULT_TIME): BzDateTime => {
    const date = new Date(`${new Date().toDateString()} ${time}`);
    return BzDateTime.fromLocaleDate(date);
  };

  /**
   * return a sort value for two BzDateTime.
   *
   * @returns DateTime object
   */
  static sort = (a: BzDateTime, b: BzDateTime) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  };

  /**
   * @returns internal dateTime as plain Date object or new Date()
   */
  public getSafeDate = (): Date => new Date(this.valueOf());

  /**
   * @param duration - should be an object with 'second(s)' and/or 'minute(s)' and/or 'hour(s)' and/or 'day(s)'.
   *  To obtain "minus" functionality should use negative values
   *
   * @remarks
   * method doesn't mutate DateTime object
   *
   * @returns new DateTime object
   */
  public plus = (duration: Duration): BzDateTime => {
    const date = this.valueOf();
    if (!date) {
      return new BzDateTime(this.getSafeDate());
    }
    const msToAdd = (Object.keys(duration) as TimeKey[]).reduce((ms, key) => {
      return ms + msMultiplier[key] * duration[key];
    }, 0);
    return new BzDateTime(date + msToAdd);
  };

  /**
   * @returns date string in YYYY-MM-DD format
   */
  public toISODateString = (): string => this.toISOString().slice(0, 10);

  /**
   * @param options.format 'AM/PM' or '24-hour', defaults to '24-hour
   * @param options.withoutSeconds boolean,
   * @param options.withoutSpace boolean, removes space before AM/PM
   * @param options.includeZero boolean, removes 0 on string start
   *
   * @returns time string in h:mm:ss a | h:mm a | h:mm:ssa | h:mma | H:mm:ss | H:mm format
   */
  public toISOTimeString = (options?: TimeFormatOptions): string => {
    const { includeZero, timeFormat = '24-hour', withoutSeconds, withoutSpace } = options ?? {};
    const [hh, mm, ss] = this.toISOString().slice(11, 19).split(':');
    const secondsSuffix = withoutSeconds ? '' : `:${ss}`;
    const hours = includeZero ? hh : +hh;
    switch (timeFormat) {
      case 'AM/PM': {
        const space = withoutSpace ? '' : ' ';
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const militaryHours = hours > 12 ? +hours - 12 : hours;
        const minSec = `:${mm}${secondsSuffix}${space}`;
        return `${militaryHours}${minSec}${amPm}`;
      }
      case '24-hour':
      default:
        return `${hours}:${mm}${secondsSuffix}`;
    }
  };

  /**
   * @returns weekday as 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' or 'Saturday'
   */

  public getWeekday = () => {
    const day = this.getDay() as number;
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
  };

  /**
   * @remarks
   * method is needed since DateTime objects cannot be compare with ===
   */
  public equals = (comparedDateTime: BzDateTime): boolean => this.valueOf() === comparedDateTime.valueOf();

  /**
   * @remarks
   * method is needed since DateTime objects cannot be compare with \<=
   */
  public equalsOrBefore = (comparedDateTime: BzDateTime): boolean => this.valueOf() <= comparedDateTime.valueOf();

  /**
   * @remarks
   * method is needed since DateTime objects cannot be compare with \>=
   */
  public equalsOrAfter = (comparedDateTime: BzDateTime): boolean => this.valueOf() >= comparedDateTime.valueOf();

  /**
   * @remarks
   * isBefore and isAfter are not actually needed, DateTime objects can compare with \<
   */
  public isBefore = (comparedDateTime: BzDateTime): boolean => this.valueOf() < comparedDateTime.valueOf();
}
