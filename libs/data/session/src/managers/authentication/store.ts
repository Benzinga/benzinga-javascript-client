import { Authentication, Permission, RefreshResponse } from './entities';
import { ListenableSubscribable } from '@benzinga/subscribable';
import { deepEqual, sortByString } from '@benzinga/utils';
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

const sortPermissions = (permissions: Permission[]) => {
  if (!Array.isArray(permissions)) return [];
  return permissions.sort((a, b) => {
    const action = sortByString(a.action, b.action);
    if (action !== 0) {
      return action;
    }
    const resource = sortByString(a.resource, b.resource);
    if (resource !== 0) {
      return resource;
    }
    const effect = sortByString(a.effect ?? '', b.effect ?? '');
    if (effect !== 0) {
      return effect;
    }
    return 0;
  });
};

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
    if (this.authentication) {
      const sortedPermissions = sortPermissions(this.authentication.user?.permissions ?? []);
      this.authentication.user.permissions = sortedPermissions;
    }
    if (
      (oldAuthentication === undefined || oldAuthentication.user.accessType === 'anonymous') &&
      auth !== undefined &&
      auth?.user.accessType !== 'anonymous'
    ) {
      this.dispatch({
        auth,
        type: 'authentication:logged_in',
      });
    }
    if (auth?.key !== oldAuthentication?.key) {
      this.dispatch({
        token: auth?.key,
        type: 'authentication:session_token_update',
      });
    }
    this.dispatch({
      auth,
      type: 'authentication:session_update',
    });
    if (
      oldAuthentication !== undefined &&
      oldAuthentication.user.accessType !== 'anonymous' &&
      (auth === undefined || auth?.user.accessType === 'anonymous')
    ) {
      this.dispatch({
        type: 'authentication:logged_out',
      });
    }
  };

  public refreshAuthenticationSession = (refresh: RefreshResponse): boolean => {
    if (this.authentication === undefined) {
      this.dispatch({
        error: new SafeError('authentication', 'cannot refresh while not logged in'),
        errorType: 'authentication:cannot_refresh_while_not_logged_in',
        type: 'error',
      });
      return false;
    }

    if (refresh.exp > Date.now() / 1000) {
      this.authentication.exp = refresh.exp;
    }
    const sortedPermissions = sortPermissions(refresh?.permissions ?? []);
    if (deepEqual(this.authentication.user.permissions, sortedPermissions) === false) {
      this.authentication.user.permissions = sortedPermissions;

      this.dispatch({
        auth: this.authentication,
        type: 'authentication:session_update',
      });
      return true;
    } else {
      return false;
    }
  };
}
