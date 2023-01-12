import { Subscribable, Subscription } from '@benzinga/subscribable';
import { SafeError, SafePromise, safeDelay } from '@benzinga/safe-await';
import {
  Authentication,
  GoogleAuthenticationResponse,
  GooglePromptResponse,
  RegisterUser,
  SessionOptions,
} from './entities';
import { getValueFromCookie } from '@benzinga/utils';
import { AuthenticationRequest, AuthenticationRequestEvent } from './request';
import { Session } from '../../session';
import { AuthenticationStore, AuthenticationStoreEvent } from './store';
import { AuthenticationEnvironment } from './environment';

interface GoogleOneTapDisplayEvent {
  display: boolean;
  type: 'authentication:google_one_tap_prompt';
}

export type AuthMode = 'login' | 'register';

export interface RequestAuthEvent {
  type: 'request_auth';
  mode: AuthMode;
}

interface AuthorizedEvent {
  type: 'authorized';
}

interface UnAuthorizedEvent {
  type: 'unauthorized';
}

export type AuthenticationManagerEvent =
  | AuthenticationRequestEvent
  | AuthenticationStoreEvent
  | GoogleOneTapDisplayEvent
  | RequestAuthEvent
  | AuthorizedEvent
  | UnAuthorizedEvent;

// type AuthenticationEnvironment = {
//   googleClientId: string;
//   url: URL;
// }

declare global {
  interface Window {
    google: any;
  }
}

/**
 * Authentication manager
 *
 * Deals with authentication in the SDK
 * This manager is always available as one of the core managers
 *
 * All other managers that work with Benzinga API will not work until
 * you authenticate using this manager
 *
 * Use your Benzinga API key as 'apiKey' environment variable for this manager to use API key authentication - in this case no further invocations of that managers are needed
 *
 * @export
 * @class AuthenticationManager
 * @extends {Subscribable<AuthenticationManagerEvent>}
 */
export class AuthenticationManager extends Subscribable<AuthenticationManagerEvent> {
  private request: AuthenticationRequest;
  private store: AuthenticationStore;
  private googleClientId: string;
  private storeSubscription?: Subscription<AuthenticationStore>;
  private requestSubscription?: Subscription<AuthenticationRequest>;
  private apiKey?: string;

  constructor(session: Session) {
    super();
    this.request = new AuthenticationRequest(session);
    this.googleClientId = session.getEnvironment(AuthenticationEnvironment).googleClientId;
    this.store = new AuthenticationStore();
    this.apiKey = session.getEnvironment(AuthenticationEnvironment).apiKey || undefined;
    const token = this.getBenzingaToken();
    setTimeout(() => {
      if (token || token === '') {
        this.getSessionNoLimit(true, token);
      }
    }, 0);
  }

  static getName = () => 'benzinga-authentication';

  /**
   * @internal
   *
   * @static
   * @memberof AuthenticationManager
   */
  public static getBenzingaTokenFromSystem = () => AuthenticationManager.getBenzingaTokenFromCookie(); // ?? AuthenticationManager.getBenzingaTokenFromLocalStorage();

  /**
   * @internal
   *
   * @private
   * @static
   * @memberof AuthenticationManager
   */
  private static getBenzingaTokenFromCookie = (): string | undefined => getValueFromCookie('benzinga_token');

  // This is a hack for the CI environment
  // private static getBenzingaTokenFromLocalStorage = (): string | undefined => {
  //   if (typeof localStorage !== `undefined`) {
  //     return localStorage.getItem('benzingaToken') ?? undefined;
  //   }
  //   return undefined;
  // };

  public setFingerprint = (fingerprint: unknown): void => this.store.setFingerprint(fingerprint);

  public getAuthentication = (): Authentication | undefined => this.store.getAuthentication();

  public showGoogleOneTap = async (): Promise<void> => {
    if (typeof window === 'undefined') {
      return;
    }
    const showGoogleOneTapRecu = async (retried = 0): Promise<void> => {
      const retryCount = retried + 1;
      if (window.google) {
        window.google.accounts.id.initialize({
          callback: this.oneTapCallback,
          client_id: this.googleClientId,
        });
        window.google.accounts.id.prompt((promptResponse: GooglePromptResponse) => {
          this.dispatch({
            display: promptResponse.g === 'display' && promptResponse.h,
            type: 'authentication:google_one_tap_prompt',
          });
        });
      } else {
        if (retryCount < 60) {
          //after 30 seconds stop trying
          await safeDelay(500);
          showGoogleOneTapRecu(retryCount);
        }
      }
    };
    showGoogleOneTapRecu(0);
  };

  public getSession = async (
    fetch?: boolean,
    token?: string,
    sessionOptions?: SessionOptions,
  ): SafePromise<Authentication> => {
    return this.setAuthentication(fetch, () => this.request.session(token, sessionOptions));
  };

  public googleAuthorized = async (accessToken: string): SafePromise<Authentication> => {
    return this.setAuthentication(false, () => this.request.googleOneTapLogin(accessToken, '/api/v1/account/session/'));
  };

  /**
   * Perform login with given username and password
   *
   * On success, will return Authentication object and persist the session data
   * Which means that other APIs can be used
   *
   * @param {string} username
   * @param {string} password
   * @param {SessionOptions} [sessionOptions]
   * @memberof AuthenticationManager
   */
  public login = async (
    username: string,
    password: string,
    sessionOptions?: SessionOptions,
  ): SafePromise<Authentication> => {
    if (!this.isLoggedIn()) {
      const auth = await this.request.login(username, password, sessionOptions, this.store.getFingerprint());
      if (auth.ok) {
        this.store.updateAuthenticationSession(auth.ok);
        // const exp = new Date(auth.ok.exp);
        // setTimeout(() => this.refresh(), exp.getTime() - 30000 - Date.now());
        setTimeout(() => this.refresh(), 30000);
      }
      this.didAuthorize();
      return auth;
    }
    return { err: new SafeError('already logged in', 'authentication_manager') };
  };

  /**
   * Perform a logout and clear all session data
   *
   * Will return an error if there is no session data (not logged in)
   *
   * @memberof AuthenticationManager
   */
  public logout = async (): SafePromise<undefined> => {
    if (this.isLoggedIn()) {
      const auth = await this.request.logout();
      // This is a hack for the CI environment
      // this.removeBenzingaToken();
      await this.getSession(true);
      this.didUnAuthorize();
      return auth;
    }
    return { err: new SafeError('not logged in', 'authentication_manager') };
  };

  /**
   * Register a new user
   *
   * @param {RegisterUser} user
   * @param {SessionOptions} [sessionOptions]
   * @memberof AuthenticationManager
   */
  public register = async (user: RegisterUser, sessionOptions?: SessionOptions): SafePromise<Authentication> => {
    const auth = await this.request.register(user, sessionOptions, this.store.getFingerprint());
    if (auth.ok) {
      this.store.updateAuthenticationSession(auth.ok);
      // we should probibly do this but i need to ask will
      //setTimeout(() => this.refresh(), 30000);
    }
    this.didAuthorize();
    return auth;
  };

  /**
   * Send request for forgotten password
   *
   * @param {string} email
   * @memberof AuthenticationManager
   */
  public forgotPassword = async (email: string): SafePromise<undefined> => {
    return await this.request.forgotPassword(email);
  };

  /**
   * Change password
   *
   * Must be logged in to call this method
   *
   * @param {string} currentPassword
   * @param {string} newPassword
   * @memberof AuthenticationManager
   */
  public changePassword = async (currentPassword: string, newPassword: string): SafePromise<undefined> => {
    if (this.isLoggedIn()) {
      return await this.request.changePassword(currentPassword, newPassword);
    }
    return { err: new SafeError('must be logged in to change password', 'authentication_manager') };
  };

  /**
   * Are you currently logged in?
   *
   * @memberof AuthenticationManager
   */
  public isLoggedIn = (): boolean => {
    const auth = this.store.getAuthentication();
    if (auth) {
      return auth.user.accessType !== 'anonymous';
    }
    const accessType = getValueFromCookie('bz_access_type');
    if (accessType) {
      return accessType !== 'anonymous';
    }
    return false;
  };

  /**
   * Returns true if 'apiKey' was supplied in the environment, which means
   * we are using Licensing API keys
   *
   * @internal
   * @memberof AuthenticationManager
   */
  public isUsingApiKey = (): boolean => {
    return !!this.apiKey;
  };

  /**
   * @internal
   *
   * @memberof AuthenticationManager
   */
  public getApiKey = (): string | undefined => {
    return this.apiKey;
  };

  /**
   * @internal
   *
   * @memberof AuthenticationManager
   */
  public getBenzingaToken = (): string | undefined => {
    return this.store.getAuthentication()?.key ?? AuthenticationManager.getBenzingaTokenFromSystem();
  };

  /**
   * @internal
   *
   * @memberof AuthenticationManager
   */
  public getCSRFToken = (): string | undefined => {
    return this.store.getAuthentication()?.csrfToken;
  };

  // this is only called if you don't login using the authentication manger
  // and don't have access to cookies
  public removeBenzingaToken = (): void => {
    this.store.updateAuthenticationSession(undefined);
  };

  // this is only called if you don't login using the authentication manger
  // and don't have access to cookies
  public setBenzingaToken = async (token: string): SafePromise<Authentication> => {
    if (token !== this.store.getAuthentication()?.key) {
      const auth = await this.request.session(token);
      if (auth.ok) {
        this.store.updateAuthenticationSession(auth.ok);
      } else {
        return auth;
      }
      // } else {
      //   // This is a hack for the CI environment
      //   if (typeof localStorage !== 'undefined') {
      //     localStorage.setItem('benzingaToken', token);
      //   }
    }
    const auth = this.store.getAuthentication();
    if (auth) {
      return { ok: auth };
    } else {
      return {
        err: new SafeError('Sno authentication set in etBenzingaToken This should not be possible', 'authentication'),
      };
    }
  };

  public requestAuthorization(mode?: AuthMode): void {
    this.dispatch({
      mode: mode ?? 'register',
      type: 'request_auth',
    });
    console.log('REQUEST AUTH');
  }

  public didAuthorize(): void {
    this.dispatch({
      type: 'authorized',
    });
    console.log('AUTHORIZED');
  }

  public didUnAuthorize(): void {
    this.dispatch({
      type: 'unauthorized',
    });
    console.log('UNAUTHORIZED');
  }

  /**
   * Confirm SMS with a token
   *
   * @param {string} token
   * @memberof AuthenticationManager
   */
  public smsConfirm = async (token: string): SafePromise<boolean> => {
    return this.request.smsConfirm(token);
  };

  /**
   * Request SMS confirmation
   *
   * @memberof AuthenticationManager
   */
  public smsRequest = async (): SafePromise<boolean> => {
    return this.request.smsRequest();
  };

  public humanConfirm = async (token: string): SafePromise<boolean> => {
    return this.request.humanConfirm(token);
  };

  public humanRequest = async (): SafePromise<boolean> => {
    return this.request.humanRequest();
  };

  public humanCheck = async (): SafePromise<boolean> => {
    return this.request.humanCheck();
  };

  protected onFirstSubscription = (): void => {
    this.requestSubscription = this.request.listen(event => this.dispatch(event));
    this.storeSubscription = this.store.listen(event => this.dispatch(event));
  };

  protected onZeroSubscriptions = (): void => {
    this.requestSubscription?.unsubscribe();
    this.requestSubscription = undefined;
    this.storeSubscription?.unsubscribe();
    this.storeSubscription = undefined;
  };

  private getSessionNoLimit = async (
    fetch?: boolean,
    token?: string,
    sessionOptions?: SessionOptions,
  ): SafePromise<Authentication> => {
    return this.setAuthentication(fetch, () => this.request.session(token, sessionOptions));
  };

  private refresh = async () => {
    const auth = await this.request.refresh(this.store.getAuthentication()?.key);
    if (auth.ok && this.store.getAuthentication()) {
      this.store.refreshAuthenticationSession(auth.ok);
      // this.authentication.exp = auth.ok.exp;
      // setTimeout(() => this.refresh(), auth.ok.exp - 30000 - Date.now());
      setTimeout(() => this.refresh(), 30000);
    }
    return auth;
  };

  private oneTapCallback = async (googleAuth: GoogleAuthenticationResponse): SafePromise<Authentication> => {
    return this.setAuthentication(false, () =>
      this.request.googleOneTapLogin(googleAuth.credential, '/api/v1/account/session/'),
    );
  };

  private setAuthentication = async (
    force: boolean | undefined,
    callback: () => SafePromise<Authentication>,
  ): SafePromise<Authentication> => {
    if (this.store.getAuthentication() === undefined || force) {
      const auth = await callback();
      if (auth.ok) {
        this.store.updateAuthenticationSession(auth.ok);
      }
      return auth;
    }
    return { err: new SafeError('already logged in', 'authentication_manager') };
  };
}
