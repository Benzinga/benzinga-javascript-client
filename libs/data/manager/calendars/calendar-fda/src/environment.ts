import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class FdaCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-fda';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
