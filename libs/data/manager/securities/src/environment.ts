export class SecuritiesEnvironment {
  public static getName = () => 'benzinga-securities';
  public static getEnvironment = (env: Record<string, string>) => ({
    key: env.key ?? '',
    url: new URL(env.url ?? 'https://api.benzinga.com'),
  });
}
