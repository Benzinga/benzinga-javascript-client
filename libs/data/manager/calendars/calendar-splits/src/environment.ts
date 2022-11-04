import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class SplitsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-splits';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
