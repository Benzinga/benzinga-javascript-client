export class WiimsEnvironment {
  public static getName = () => 'benzinga-wiims';
  public static getEnvironment = (env: Record<string, string>) => ({
    url: new URL(env.url ?? 'https://api.benzinga.com/api/'),
  });
}
