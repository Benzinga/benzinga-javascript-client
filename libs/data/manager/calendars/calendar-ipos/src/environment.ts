import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class IpoCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-ipo';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
