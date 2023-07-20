import { createSession, Session } from '@benzinga/session';

declare global {
  interface Window {
    env: any;
    google: any;
  }
}

let sessionInstance: Session;

export function getGlobalSession() {
  if (sessionInstance) return sessionInstance;

  sessionInstance = createSession({
    'benzinga-authentication': {
      apiKey: 'c1dad36b02de4ecfae54e3468adf6fa2',
    },
  });

  return sessionInstance;
}
