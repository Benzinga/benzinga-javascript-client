import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class SECCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-sec';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
