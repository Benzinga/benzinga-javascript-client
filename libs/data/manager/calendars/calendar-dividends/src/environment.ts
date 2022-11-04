import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class DividendsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-dividends';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
