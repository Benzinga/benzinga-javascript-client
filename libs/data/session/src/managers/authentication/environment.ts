export class AuthenticationEnvironment {
  static getName = () => 'benzinga-authentication';
  static getEnvironment = (env: Record<string, string>) => ({
    apiKey: env.apiKey ?? '',
    googleClientId: env.googleClientId ?? '325438794491-bg460k8jbhbqavvn6ve5ilc1e34s8892.apps.googleusercontent.com',
    //da83df46-4cf9-4b9c-8df7-ad10bbea9793
    maxLayoutVersion: env.maxLayoutVersion,

    microsoftClientId: env.microsoftClientId ?? '79236a74-8b99-4664-a719-0c0fdf4e9cce',
    url: new URL(env.url ?? 'https://accounts.benzinga.com'),
  });
}
