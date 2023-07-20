export class SignalsEnvironment {
  public static getName = () => 'benzinga-signals';
  public static getEnvironment = (env: Record<string, string>) => ({
    key: env.key ?? 'aH0FkLCohY5yxK6OEaJ28Zpv51Ze1GyY',
    restfulUrl: new URL(env.restfulUrl ?? 'https://signals.benzinga.io/signals/api/'),
    socketUrl: new URL(env.socketUrl ?? 'wss://signals.benzinga.io/signals/ws'),
  });
}
