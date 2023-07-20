import { genHeaders, SafePromise } from '@benzinga/safe-await';
import { Session } from '../session';
import {
  addParamsToURL,
  DataRequestInit,
  extendPathname,
  IncludeHeader,
  safeDataFetch,
  safeDataFetchWithNoContent,
  safeJsonDataFetch,
} from './restfulClientHelpers';
/*
 * apiKey set to undefined means don't set header
 * deviceToken set to null means try to get value for cookie while undefined means don't set header
 */

export interface RestfulClientOptionalParams {
  tokenParameterName?: string;
}

export class RestfulClient {
  protected hostname: URL;
  protected session: Session;
  private includeHeader?: IncludeHeader;
  private debouncedGetRequest = new Map<string, SafePromise<unknown>>();
  private options: RestfulClientOptionalParams;

  constructor(
    hostname: URL,
    session: Session,
    includeHeader?: IncludeHeader,
    options: RestfulClientOptionalParams = {
      tokenParameterName: undefined,
    },
  ) {
    this.includeHeader = includeHeader;
    this.hostname = hostname;
    this.session = session;
    this.options = options;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected URL = (pathname: string | undefined, params?: object): URL => {
    const url = pathname !== undefined ? extendPathname(this.hostname, pathname) : new URL(this.hostname);

    const actualParams = params || {};

    //Warning: do not use `includeApiKey` in the authentication manager, it will cause infinite recursive call then
    if (this.options.tokenParameterName !== undefined && this.session.getAuthenticationManager().isUsingApiKey()) {
      const apiKeyParameterName = this.options.tokenParameterName || 'token';

      //do not override user-provided value
      const possibleUserProvidedValue = actualParams[apiKeyParameterName];

      actualParams[apiKeyParameterName] =
        possibleUserProvidedValue || this.session.getAuthenticationManager().getApiKey();
    }

    return addParamsToURL(url, actualParams);
  };

  protected jsonFetch = <T>(input: RequestInfo, init: Partial<DataRequestInit> = {}): SafePromise<T> => {
    return safeJsonDataFetch<T>(input, {
      authenticationManager: this.session.getAuthenticationManager(),
      includeHeader: init.includeHeader ?? this.includeHeader,
      ...init,
    });
  };

  protected fetch = (input: RequestInfo, init: Partial<DataRequestInit> = {}): SafePromise<Response> => {
    return safeDataFetch(input, {
      authenticationManager: this.session.getAuthenticationManager(),
      includeHeader: init.includeHeader ?? this.includeHeader,
      ...init,
    });
  };

  protected sendBeacon = (input: URL, data: unknown): boolean => {
    return window.navigator.sendBeacon(input.toString(), JSON.stringify(data));
  };

  protected get = <T>(input: URL, init: Partial<DataRequestInit> = {}): SafePromise<T> => {
    init.method = 'GET';
    // console.log(input.toString())
    return this.jsonFetch(input.toString(), init);
  };

  protected getProtoBuf = (input: URL, init: Partial<DataRequestInit> = {}): SafePromise<Response> => {
    init.method = 'GET';

    init.headers = genHeaders(init.headers);
    init.headers.set('accept', 'application/x-protobuf');

    return this.fetch(input.toString(), init);
  };

  protected getRaw = (input: URL, init: Partial<DataRequestInit> = {}): SafePromise<Response> => {
    init.method = 'GET';
    return this.fetch(input.toString(), init);
  };

  protected debouncedGet = async <T>(input: URL, init: Partial<DataRequestInit> = {}): SafePromise<T> => {
    init.method = 'GET';
    const url = input.toString();
    if (this.debouncedGetRequest.has(url)) {
      return this.debouncedGetRequest.get(url) as SafePromise<T>;
    } else {
      const response = this.jsonFetch(input.toString(), init) as SafePromise<T>;
      this.debouncedGetRequest.set(url, response);
      await response;
      this.debouncedGetRequest.delete(url);
      return response;
    }
  };

  protected debouncedGetWithNoContent = async <T>(input: URL, init: Partial<DataRequestInit> = {}): SafePromise<T> => {
    init.method = 'GET';
    const url = input.toString();
    if (this.debouncedGetRequest.has(url)) {
      return this.debouncedGetRequest.get(url) as SafePromise<T>;
    } else {
      const response = safeDataFetchWithNoContent<T>(input.toString(), {
        authenticationManager: this.session.getAuthenticationManager(),
        includeHeader: init.includeHeader ?? this.includeHeader,
        ...init,
      });
      this.debouncedGetRequest.set(url, response);
      await response;
      this.debouncedGetRequest.delete(url);
      return response;
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected post = <T, BODY>(input: URL, body?: BODY, init: Partial<DataRequestInit> = {}): SafePromise<T> => {
    init.method = 'POST';
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }
    return this.jsonFetch(input.toString(), init);
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected put = <T, BODY>(input: URL, body?: BODY, init: Partial<DataRequestInit> = {}): SafePromise<T> => {
    init.method = 'PUT';
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }
    return this.jsonFetch(input.toString(), init);
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected patch = <T, BODY extends object>(
    input: URL,
    body?: BODY,
    init: Partial<DataRequestInit> = {},
  ): SafePromise<T> => {
    init.method = 'PATCH';
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }
    return this.jsonFetch(input.toString(), init);
  };

  protected delete = (input: URL, init: Partial<DataRequestInit> = {}): SafePromise<Response> => {
    init.method = 'DELETE';
    return this.fetch(input.toString(), init);
  };
}
