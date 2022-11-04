import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class MaCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-ma';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
