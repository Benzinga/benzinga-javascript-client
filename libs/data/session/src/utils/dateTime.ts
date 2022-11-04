/* eslint-disable sort-keys */
type TimeKey = 'seconds' & 'minutes' & 'hours' & 'days';
type Duration = {
  [key in TimeKey]: number;
};

const DEFAULT_TIME = '00:00:00';
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

export class DateTime extends Date {
  private dateTime: Date | undefined;

  constructor(dateTime: Date | undefined) {
    super();
    this.dateTime = dateTime;
  }

  static dateNow = (): DateTime => new DateTime(new Date());

  static fromDate = (dateTime: Date): DateTime => new DateTime(dateTime);

  static fromISO = (dateString: string | undefined | null, time: string = DEFAULT_TIME, timezone = ''): DateTime => {
    const dateTime = dateString ? new Date(`${dateString}T${time}${timezone}`) : undefined;
    return new DateTime(dateTime);
  };

  public plus = (duration: Duration): DateTime => {
    const date = this.valueOf();
    if (!date) {
      return new DateTime(this.dateTime);
    }
    const msToAdd = (Object.keys(duration) as TimeKey[]).reduce((ms, key) => {
      return ms + msMultiplier[key] * duration[key];
    }, 0);
    const newDate = new Date(date + msToAdd);
    return new DateTime(newDate);
  };

  //returns YYYY-MM-DD
  public toISODateString = (): string => {
    if (this.valueOf() && this.dateTime) {
      const yyyy = this.dateTime.getFullYear();
      const m = this.dateTime.getMonth() + 1;
      const mm = m < 10 ? '0' + m : m;
      const d = this.dateTime.getDate();
      const dd = d < 10 ? '0' + d : d;
      return `${yyyy}-${mm}-${dd}`;
    }
    return '';
  };

  public equals = (comparedDateTime: DateTime): boolean => this.valueOf() === comparedDateTime.valueOf();
  public equalsOrBefore = (comparedDateTime: DateTime): boolean => this.valueOf() <= comparedDateTime.valueOf();
  public equalsOrAfter = (comparedDateTime: DateTime): boolean => this.valueOf() >= comparedDateTime.valueOf();
  // isBefore and isAfter are not actually needed, DateTime objects can compare with < and > (but not with ===)
  public isBefore = (comparedDateTime: DateTime): boolean => this.valueOf() < comparedDateTime.valueOf();
  public isAfter = (comparedDateTime: DateTime): boolean => this.valueOf() > comparedDateTime.valueOf();

  public valueOf = (): number => this.dateTime?.valueOf() ?? NaN; // this will always return false when comparing to other DateTime
}
