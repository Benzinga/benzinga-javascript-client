export class SecuritiesEnvironment {
  public static getName = () => 'benzinga-securities';
  public static getEnvironment = (env: Record<string, string>) => ({
    insiderUrl: new URL(env.insiderUrl ?? 'https://www.benzinga.com/sec/'),
    key: env.key ?? '',
    url: new URL(env.url ?? 'https://api.benzinga.com'),
  });
}
