import { SafeError, safeMap, SafePromise } from '@benzinga/safe-await';
import { RestfulClient } from '../../utils';
import { Session } from '../../session';
import { SessionOptions } from './entities';
import { EgressRegisterUser } from './egress';
import { IngressAuthentication, IngressRefreshResponse, IngressSmsResponse, IngressHumanResponse } from './ingress';
import { AuthenticationEnvironment } from './environment';

export class AuthenticationRestful extends RestfulClient {
  constructor(session: Session) {
    super(session.getEnvironment(AuthenticationEnvironment).url, session, { 'x-device-key': true });
  }

  public googleOneTapLogin = (idToken: string, redirectUrl: string): SafePromise<IngressAuthentication> => {
    const url = this.URL('oauth/complete/google-one-tap/', {
      id_token: idToken,
      next: redirectUrl,
    });
    return this.get(url, {
      allowsAnonymousAuth: true,
    });
  };

  public login = (
    email: string,
    password: string,
    sessionOptions?: SessionOptions,
    fingerprint?: unknown,
  ): SafePromise<IngressAuthentication> => {
    const url = this.URL(
      'api/v1/account/login/',
      sessionOptions ?? { include_cards: true, include_perms: true, include_subs: true },
    );
    return this.post(url, { email, fingerprint, password }, { allowsAnonymousAuth: true });
  };

  public logout = (): SafePromise<undefined> => {
    const url = this.URL('api/v1/account/logout/');
    return safeMap(this.getRaw(url), () => undefined);
  };

  public forgotPassword = (email: string): SafePromise<undefined> => {
    const url = this.URL('api/v1/account/reset/password/request/');
    return this.post(url, { email }, { allowsAnonymousAuth: true });
  };

  public changePassword = (currentPassword: string, newPassword: string): SafePromise<undefined> => {
    const url = this.URL('api/v1/account/change/password/');
    return this.post(url, { current_password: currentPassword, new_password: newPassword });
  };

  public register = (user: EgressRegisterUser, sessionOptions?: SessionOptions): SafePromise<IngressAuthentication> => {
    const url = this.URL('api/v1/account/register/', sessionOptions);
    return this.post(url, user, { allowsAnonymousAuth: true });
  };

  public refresh = (token?: string): SafePromise<IngressRefreshResponse> => {
    const url = this.URL('api/v1/account/refresh/');
    if (token) {
      return this.post(url, {});
    } else {
      return this.post(url);
    }
  };

  public getSession = (token?: string, sessionOptions?: SessionOptions): SafePromise<IngressAuthentication> => {
    const url = this.URL('api/v1/account/session/', {
      allow_anonymous: true,
      ...(sessionOptions ?? { include_cards: true, include_perms: true, include_subs: true }),
    });
    // TODO remove this once pro and bznext uses authManager to login

    return this.debouncedGet(url, {
      allowsAnonymousAuth: true,
      bzToken: token,
      includeHeader: { authorizationSession: !!token },
      resilience: {
        delayMultiple: 1,
        delayOffset: 30000,
        isError: result => {
          return new Promise(resolve => {
            if ((result as any)['detail'] != null) {
              resolve({ err: new SafeError('throttled', 'throttled', result) });
            } else {
              resolve({ result: result });
            }
          });
        },
        maxDelay: 30000,
        retryOnError: true,
        timeoutLength: 120000,
      },
    });
  };

  public smsCheck = (): SafePromise<IngressSmsResponse> => {
    const url = this.URL('api/v1/account/verify/sms/check/');
    return this.get(url);
  };

  public smsRequest = (): SafePromise<IngressSmsResponse> => {
    const url = this.URL('api/v1/account/verify/sms/request/');
    return this.post(url, undefined);
  };

  public smsConfirm = (token: string): SafePromise<IngressSmsResponse> => {
    const url = this.URL('api/v1/account/verify/sms/confirm/');
    return this.post(url, { token });
  };

  public humanCheck = (): SafePromise<IngressHumanResponse> => {
    const url = this.URL('api/v1/account/verify/human/check/');
    return this.get(url);
  };

  public humanRequest = (): SafePromise<IngressHumanResponse> => {
    const url = this.URL('api/v1/account/verify/human/request/');
    return this.post(url, undefined);
  };

  public humanConfirm = (token: string): SafePromise<IngressHumanResponse> => {
    const url = this.URL('api/v1/account/verify/human/confirm/');
    return this.post(url, { token });
  };
}
