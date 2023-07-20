import {
  genHeaders,
  ResilientJsonRequestInit,
  SafeError,
  safeFetch,
  safeJsonFetch,
  safeFetchWithNoContent,
  safeJsonResilientFetch,
  SafePromise,
  SafeType,
  TimeoutableRequestInit,
} from '@benzinga/safe-await';
import { isObject } from '@benzinga/utils';
import { AuthenticationManager } from '../managers/authentication/manager';

export interface IncludeHeader {
  authorization?: boolean;
  authorizationSession?: boolean;
  'x-device-key'?: boolean;
  'x-session-key'?: boolean;
  'x-csrf-token'?: boolean;
  referer?: string;
}

interface QueryParamsObject {
  [key: string]: number | string;
}

interface DataRequestInitBase {
  allowsAnonymousAuth?: boolean;
  bzToken?: string;
  includeHeader?: IncludeHeader;
}

export type DataRequestInit<T = unknown, X = unknown> =
  | (DataRequestInitBase & { authenticationManager: AuthenticationManager } & TimeoutableRequestInit)
  | (DataRequestInitBase & { authenticationManager: AuthenticationManager } & ResilientJsonRequestInit<T, X>);

// eslint-disable-next-line @typescript-eslint/ban-types
export const addParamsToURL = (url: URL, params: object): URL => {
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      appendParamsToURL(url, key, value);
    } else if (isObject(value)) {
      const QueryParamsObject = encodeObjectToQueryParams(value, key);
      Object.entries(QueryParamsObject).forEach(([key, value]) => {
        url.searchParams.set(key, `${value}`);
      });
    } else if (value !== undefined) {
      url.searchParams.set(key, `${value}`);
    }
  });
  return url;
};

export const appendParamsToURL = (url: URL, paramKey: string, values: string[]): URL => {
  values.forEach(item => {
    url.searchParams.append(paramKey, item);
  });

  return url;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const encodeObjectToString = <T extends object>(params: T, parentName: string): string =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      const queryKey = `${parentName}[${key}]`;
      if (isObject(value)) {
        return encodeObjectToString(value, key);
      } else {
        return `${encodeURIComponent(queryKey)}=${encodeURIComponent(String(value))}`;
      }
    })
    .join('&');

// eslint-disable-next-line @typescript-eslint/ban-types
export const encodeObjectToQueryParams = <T extends object>(params: T, parentName: string): QueryParamsObject => {
  let objectParams: QueryParamsObject = {};
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => {
      const queryKey = `${parentName}[${key}]`;
      if (isObject(value)) {
        objectParams = { ...objectParams, ...encodeObjectToQueryParams(value, queryKey) };
      } else {
        objectParams[queryKey] = value;
      }
    });

  return objectParams;
};

export const extendPathname = (url: URL, pathname: string): URL => {
  return new URL(pathname, url);
};

// const ExtendPathnameAddParamsToURL = (
//   url: URL,
//   pathname: string,
//   params: Record<string, string | number | boolean | null | undefined>,
// ): URL => {
//   url = ExtendPathname(url, pathname);
//   url = AddParamsToURL(url, params);
//   return url;
// };

export const safeJsonDataFetch = async <T>(input: RequestInfo, init: DataRequestInit): SafePromise<T> => {
  const initializedConfig = await initFetch(init);
  if (initializedConfig.err) {
    return initializedConfig as SafeType<T>;
  }
  if ((initializedConfig.ok as ResilientJsonRequestInit<unknown, unknown>).resilience) {
    return safeJsonResilientFetch<T>(input, initializedConfig.ok);
  } else {
    return safeJsonFetch<T>(input, initializedConfig.ok);
  }
};

export const safeDataFetchWithNoContent = async <T>(input: RequestInfo, init: DataRequestInit): SafePromise<T> => {
  const initializedConfig = await initFetch(init);
  if (initializedConfig.err) {
    return initializedConfig as SafeType<T>;
  }
  if ((initializedConfig.ok as ResilientJsonRequestInit<unknown, unknown>).resilience) {
    return safeJsonResilientFetch<T>(input, initializedConfig.ok);
  } else {
    return safeFetchWithNoContent<T>(input, initializedConfig.ok);
  }
};

export const safeDataFetch = async (input: RequestInfo, init: DataRequestInit): SafePromise<Response> => {
  const initializedConfig = await initFetch(init);
  if (initializedConfig.err) {
    return initializedConfig as SafeType<Response>;
  }
  return safeFetch(input, initializedConfig.ok);
};

export const initFetch = async (init: DataRequestInit): SafePromise<DataRequestInit> => {
  init.headers = genHeaders(init.headers);
  init.credentials = init.credentials ?? 'include';

  if ((init.allowsAnonymousAuth ?? false) === false && init.authenticationManager.isLoggedIn() === false) {
    // the reason for this is because chrome likes to show a sign in promp if a request returns a 401
    // while having credentials include or auth header
    return { err: new SafeError('must be logged in to call this endpoint', 'auth_required') };
  }
  const authToken = init.bzToken ?? init.authenticationManager.getBenzingaToken();
  const csrfToken = init.authenticationManager.getCSRFToken();
  if (init.includeHeader?.['x-device-key'] && authToken) {
    init.headers.set('x-device-key', authToken);
  }
  if (init.includeHeader?.['authorization'] && authToken) {
    init.headers.set('authorization', authToken);
  }
  if (init.includeHeader?.['authorizationSession'] && authToken) {
    init.headers.set('authorization', `session ${authToken}`);
  }
  if (init.includeHeader?.['x-session-key'] && authToken) {
    init.headers.set('x-session-key', authToken);
  }
  if (init.includeHeader?.['x-csrf-token'] && csrfToken) {
    init.headers.set('X-CSRFToken', csrfToken);
  }
  if (init.includeHeader?.['referer']) {
    init.headers.set('Referer', init.includeHeader?.['referer']);
  }

  return { ok: init };
};
