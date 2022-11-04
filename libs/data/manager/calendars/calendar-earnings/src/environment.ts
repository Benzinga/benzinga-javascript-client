import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class EarningsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-earnings';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
