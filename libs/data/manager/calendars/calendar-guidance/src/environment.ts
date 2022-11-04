import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class GuidanceCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-guidance';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
