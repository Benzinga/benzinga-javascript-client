export class MoversEnvironment {
  public static getName = () => 'benzinga-movers';
  public static getEnvironment = (env: Record<string, string>) => ({
    key: env.key ?? '',
    url: new URL(env.url ?? 'https://www.benzinga.com/api/'),
  });
}
