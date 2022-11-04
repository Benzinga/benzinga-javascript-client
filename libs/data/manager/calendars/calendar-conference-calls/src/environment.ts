import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class ConferenceCallsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-conference-calls';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
