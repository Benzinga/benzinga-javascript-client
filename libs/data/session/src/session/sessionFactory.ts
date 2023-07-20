import { SessionEnvironment } from './env';
import { Session } from './session';

let globalSession: Session | null = null;

export const createSession = (env?: SessionEnvironment): Session => {
  const session = new Session(env);
  if (globalSession === null) {
    globalSession = session;
  }
  return session;
};

/**
 * @deprecated
 *
 * @export
 * @param {SessionEnvironment} [env]
 * @return {*}  {Session}
 */
export function getGlobalManager(env?: SessionEnvironment): Session {
  if (globalSession === null) {
    globalSession = new Session(env);
  }

  return globalSession;
}
