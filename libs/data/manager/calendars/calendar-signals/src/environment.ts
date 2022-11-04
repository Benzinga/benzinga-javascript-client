import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class SignalsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-signals';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
