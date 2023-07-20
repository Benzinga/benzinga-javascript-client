export class SECCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-sec';

  public static getEnvironment = (env: Record<string, string>) => ({
    token: env.token ?? '',
    url: new URL(env.url ?? 'https://api.benzinga.com/api/v2/calendar/sec'),
  });
}
