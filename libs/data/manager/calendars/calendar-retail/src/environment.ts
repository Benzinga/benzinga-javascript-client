import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class RetailCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-retail';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
