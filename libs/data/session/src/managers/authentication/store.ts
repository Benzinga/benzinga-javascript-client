import { Authentication, RefreshResponse } from './entities';
import { ListenableSubscribable } from '@benzinga/subscribable';
import { deepEqual } from '@benzinga/utils';
import { SafeError } from '@benzinga/safe-await';

interface AuthenticationLoggedInEvent {
  auth: Authentication;
  type: 'authentication:logged_in';
}

interface AuthenticationLoggedOutEvent {
  type: 'authentication:logged_out';
}

interface AuthenticationUpdateTokenEvent {
  token: string | undefined;
  type: 'authentication:session_token_update';
}

interface AuthenticationUpdateEvent {
  auth: Authentication | undefined;
  type: 'authentication:session_update';
}

interface AuthenticationRefreshErrorEvent {
  error: SafeError;
  errorType: 'authentication:cannot_refresh_while_not_logged_in';
  type: 'error';
}

export type AuthenticationStoreEvent =
  | AuthenticationUpdateTokenEvent
  | AuthenticationUpdateEvent
  | AuthenticationLoggedInEvent
  | AuthenticationLoggedOutEvent
  | AuthenticationRefreshErrorEvent;

export class AuthenticationStore extends ListenableSubscribable<AuthenticationStoreEvent> {
  private authentication: Authentication | undefined;
  private fingerprint?: unknown;

  public getFingerprint = (): unknown => this.fingerprint;

  public setFingerprint = (fingerprint: unknown): void => {
    this.fingerprint = fingerprint;
  };

  public getAuthentication = () => this.authentication;

  public updateAuthenticationSession = (auth: Authentication | undefined): void => {
    const oldAuthentication = this.authentication;
    this.authentication = auth;
    if (
      (oldAuthentication === undefined || oldAuthentication.user.accessType === 'anonymous') &&
      auth !== undefined &&
      auth?.user.accessType !== 'anonymous'
    ) {
      this.call({
        auth,
        type: 'authentication:logged_in',
      });
    }
    if (auth?.key !== oldAuthentication?.key) {
      this.call({
        token: auth?.key,
        type: 'authentication:session_token_update',
      });
    }
    this.call({
      auth,
      type: 'authentication:session_update',
    });
    if (
      oldAuthentication !== undefined &&
      oldAuthentication.user.accessType !== 'anonymous' &&
      (auth === undefined || auth?.user.accessType === 'anonymous')
    ) {
      this.call({
        type: 'authentication:logged_out',
      });
    }
  };

  public refreshAuthenticationSession = (refresh: RefreshResponse): void => {
    if (this.authentication === undefined) {
      this.call({
        error: new SafeError('authentication', 'cannot refresh while not logged in'),
        errorType: 'authentication:cannot_refresh_while_not_logged_in',
        type: 'error',
      });
    } else if (
      this.authentication.user.accessType !== refresh.accessType ||
      deepEqual(this.authentication.user.permissions, refresh.permissions) === false
    ) {
      this.authentication.user.accessType = refresh.accessType;
      this.authentication.user.permissions = refresh.permissions;
      this.authentication.exp = refresh.exp;

      this.call({
        auth: this.authentication,
        type: 'authentication:session_update',
      });
    }
  };
}
