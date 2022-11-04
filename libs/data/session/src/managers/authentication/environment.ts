export class AuthenticationEnvironment {
  static getName = () => 'benzinga-authentication';
  static getEnvironment = (env: Record<string, string>) => ({
    apiKey: env.apiKey ?? '',
    googleClientId: env.googleClientId ?? '325438794491-bg460k8jbhbqavvn6ve5ilc1e34s8892.apps.googleusercontent.com',
    url: new URL(env.url ?? 'https://accounts.benzinga.com'),
  });
}
