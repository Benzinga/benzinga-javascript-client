export class SignalsCalendarEnvironment {
  public static getName = () => 'benzinga-calendar-option-activity';

  public static getEnvironment = (env: Record<string, string>) => ({
    token: env.token ?? '',
    url: new URL(env.url ?? 'https://api.benzinga.com/api/v1/signal/option_activity'),
  });
}
