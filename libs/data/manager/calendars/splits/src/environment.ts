export class SplitsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-splits';

  public static getEnvironment = (env: Record<string, string>) => ({
    token: env.token ?? '',
    url: new URL(env.url ?? 'https://api.benzinga.com/api/v2.1/calendar/splits'),
  });
}
