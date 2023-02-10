export class MoversEnvironment {
  public static getName = () => 'benzinga-movers';
  public static getEnvironment = (env: Record<string, string>) => ({
    key: env.key ?? 'TkWiPBzZ5YdSlzmEblWB8eTljd5kXvmb6zNy',
    url: new URL(env.url ?? 'https://api.benzinga.com/api/v1/market/'),
  });
}
