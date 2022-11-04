import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class EconomicsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-economics';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
