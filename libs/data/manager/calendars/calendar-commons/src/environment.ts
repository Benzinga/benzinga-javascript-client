export function extractCommonCalendarEnv(env: Record<string, string>) {
  return {
    dataUrl: new URL(env.dataUrl ?? 'https://api.benzinga.com/api/'),
    token: env.token ?? '',
    url: new URL(env.url ?? 'https://www.benzinga.com/'),
  };
}

export interface CommonCalendarEnvironmentProps {
  dataUrl: URL;
  token: string;
  url: URL;
}
