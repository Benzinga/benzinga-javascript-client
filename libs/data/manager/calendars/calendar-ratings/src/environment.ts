import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class RatingsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-ratings';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
