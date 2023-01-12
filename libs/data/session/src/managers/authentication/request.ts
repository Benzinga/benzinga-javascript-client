import { SafeError, SafePromise } from '@benzinga/safe-await';
import { ExtendedListenableSubscribable } from '@benzinga/subscribable';
import { Session } from '../../session';

import { Authentication, RefreshResponse, RegisterUser, SessionOptions } from './entities';
import { ingestAuthentication, ingestRefreshResponse, ingestSmsResponse, ingestHumanResponse } from './ingress';
import { egressRegister } from './egress';
import { AuthenticationRestful } from './restful';

interface ErrorEvent {
  error?: SafeError;
  errorType:
    | 'change_password_error'
    | 'forgot_password_error'
    | 'login_error'
    | 'logout_error'
    | 'refresh_error'
    | 'register_error'
    | 'session_error'
    | 'confirm_sms_error'
    | 'request_sms_error'
    | 'check_human_error'
    | 'confirm_human_error'
    | 'request_human_error';
  type: 'error';
}

interface RequestingEvent {
  type:
    | 'authentication:requesting_logged_in'
    | 'authentication:requesting_logged_in'
    | 'authentication:requesting_logged_out'
    | 'authentication:requesting_forgot_password'
    | 'authentication:requesting_change_password'
    | 'authentication:requesting_registered'
    | 'authentication:requesting_refreshed'
    | 'authentication:requesting_session'
    | 'authentication:requesting_confirm_sms'
    | 'authentication:requesting_request_sms'
    | 'authentication:requesting_check_human'
    | 'authentication:requesting_confirm_human'
    | 'authentication:requesting_request_human';
}

export type AuthenticationRequestEvent = ErrorEvent | RequestingEvent;

interface AuthenticationFunctions {
  changePassword: AuthenticationRequest['changePassword'];
  forgotPassword: AuthenticationRequest['forgotPassword'];
  googleOneTapLogin: AuthenticationRequest['googleOneTapLogin'];
  login: AuthenticationRequest['login'];
  logout: AuthenticationRequest['logout'];
  refresh: AuthenticationRequest['refresh'];
  register: AuthenticationRequest['register'];
}

export class AuthenticationRequest extends ExtendedListenableSubscribable<
  AuthenticationRequestEvent,
  AuthenticationFunctions
> {
  private restful: AuthenticationRestful;

  constructor(session: Session) {
    super();
    this.restful = new AuthenticationRestful(session);
  }

  public googleOneTapLogin = async (idToken: string, redirectUrl: string): SafePromise<Authentication> => {
    this.dispatch({
      type: 'authentication:requesting_logged_in',
    });
    const newLogin = await ingestAuthentication(this.restful.googleOneTapLogin(idToken, redirectUrl));
    if (newLogin.err) {
      this.dispatch({
        error: newLogin.err,
        errorType: 'login_error',
        type: 'error',
      });
    }
    return newLogin;
  };

  public login = async (
    email: string,
    password: string,
    sessionOptions?: SessionOptions,
    fingerprint?: unknown,
  ): SafePromise<Authentication> => {
    this.dispatch({
      type: 'authentication:requesting_logged_in',
    });
    const newLogin = await ingestAuthentication(this.restful.login(email, password, sessionOptions, fingerprint));
    if (newLogin.err) {
      const jsonRes = await (newLogin.err.data as Response).json();
      const json = jsonRes['detail'];
      const error = { err: json ? new SafeError(`${json}`, 'response', newLogin.err.data) : newLogin.err };
      this.dispatch({
        error: error.err,
        errorType: 'login_error',
        type: 'error',
      });
      return error;
    }
    return newLogin;
  };

  public logout = async (): SafePromise<undefined> => {
    this.dispatch({
      type: 'authentication:requesting_logged_out',
    });
    const logout = await this.restful.logout();
    if (logout.err) {
      this.dispatch({
        error: logout.err,
        errorType: 'logout_error',
        type: 'error',
      });
    }
    return logout;
  };

  public forgotPassword = async (email: string): SafePromise<undefined> => {
    this.dispatch({
      type: 'authentication:requesting_forgot_password',
    });
    const logout = await this.restful.forgotPassword(email);
    if (logout.err) {
      this.dispatch({
        error: logout.err,
        errorType: 'forgot_password_error',
        type: 'error',
      });
    }
    return logout;
  };

  public changePassword = async (currentPassword: string, newPassword: string): SafePromise<undefined> => {
    this.dispatch({
      type: 'authentication:requesting_change_password',
    });
    const logout = await this.restful.changePassword(currentPassword, newPassword);
    if (logout.err) {
      this.dispatch({
        error: logout.err,
        errorType: 'change_password_error',
        type: 'error',
      });
    }
    return logout;
  };

  public register = async (
    user: RegisterUser,
    sessionOptions?: SessionOptions,
    fingerprint?: unknown,
  ): SafePromise<Authentication> => {
    this.dispatch({
      type: 'authentication:requesting_registered',
    });
    const auth = await ingestAuthentication(this.restful.register(egressRegister(user, fingerprint), sessionOptions));
    if (auth.err) {
      const jsonRes = await (auth.err.data as Response).json();
      const json = jsonRes[Object.keys(jsonRes)[0]];
      const error = { err: json ? new SafeError(`${json}`, 'response', auth.err.data) : auth.err };
      this.dispatch({
        error: error.err,
        errorType: 'register_error',
        type: 'error',
      });
      return error;
    }
    return auth;
  };

  public refresh = async (token?: string): SafePromise<RefreshResponse> => {
    this.dispatch({
      type: 'authentication:requesting_refreshed',
    });
    const refresh = await ingestRefreshResponse(this.restful.refresh(token));
    if (refresh.err) {
      this.dispatch({
        error: refresh.err,
        errorType: 'refresh_error',
        type: 'error',
      });
    }
    return refresh;
  };

  public session = async (token?: string, sessionOptions?: SessionOptions): SafePromise<Authentication> => {
    this.dispatch({
      type: 'authentication:requesting_session',
    });
    const session = await ingestAuthentication(this.restful.getSession(token, sessionOptions));
    if (session.err) {
      this.dispatch({
        error: session.err,
        errorType: 'session_error',
        type: 'error',
      });
    }
    return session;
  };

  public smsConfirm = async (token: string): SafePromise<boolean> => {
    this.dispatch({
      type: 'authentication:requesting_confirm_sms',
    });
    const smsVerified = await ingestSmsResponse(this.restful.smsConfirm(token));
    if (smsVerified.err) {
      this.dispatch({
        error: smsVerified.err,
        errorType: 'confirm_sms_error',
        type: 'error',
      });
    }
    return smsVerified;
  };

  public smsRequest = async (): SafePromise<boolean> => {
    this.dispatch({
      type: 'authentication:requesting_request_sms',
    });
    const smsVerified = await ingestSmsResponse(this.restful.smsRequest());
    if (smsVerified.err) {
      this.dispatch({
        error: smsVerified.err,
        errorType: 'request_sms_error',
        type: 'error',
      });
    }
    return smsVerified;
  };

  public humanCheck = async (): SafePromise<boolean> => {
    this.dispatch({
      type: 'authentication:requesting_check_human',
    });
    const humanVerified = await ingestHumanResponse(this.restful.humanCheck());
    if (humanVerified.err) {
      this.dispatch({
        error: humanVerified.err,
        errorType: 'check_human_error',
        type: 'error',
      });
    }
    return humanVerified;
  };

  public humanConfirm = async (token: string): SafePromise<boolean> => {
    this.dispatch({
      type: 'authentication:requesting_confirm_human',
    });
    const humanVerified = await ingestHumanResponse(this.restful.humanConfirm(token));
    if (humanVerified.err) {
      this.dispatch({
        error: humanVerified.err,
        errorType: 'confirm_human_error',
        type: 'error',
      });
    }
    return humanVerified;
  };

  public humanRequest = async (): SafePromise<boolean> => {
    this.dispatch({
      type: 'authentication:requesting_request_human',
    });
    const humanVerified = await ingestHumanResponse(this.restful.humanRequest());
    if (humanVerified.err) {
      this.dispatch({
        error: humanVerified.err,
        errorType: 'request_human_error',
        type: 'error',
      });
    }
    return humanVerified;
  };

  protected onSubscribe = (): AuthenticationFunctions => ({
    changePassword: this.changePassword,
    forgotPassword: this.forgotPassword,
    googleOneTapLogin: this.googleOneTapLogin,
    login: this.login,
    logout: this.logout,
    refresh: this.refresh,
    register: this.register,
  });
}
