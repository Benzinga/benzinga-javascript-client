import { extractCommonCalendarEnv } from '@benzinga/calendar-commons';

export class OfferingsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-offerings';

  public static getEnvironment = (env: Record<string, string>) => ({
    ...extractCommonCalendarEnv(env),
  });
}
