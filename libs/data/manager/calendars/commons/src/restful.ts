import { SafePromise } from '@benzinga/safe-await';
import { Session, RestfulClient } from '@benzinga/session';
import { CommonCalendarEnvironmentProps } from './environment';

import { genUrlParams } from './urlProps';
import { CommonCalendarQueryParams } from './entities';
import { CommonCalendarRequestOptions } from './internalEntities';

export class CommonCalendarRestful extends RestfulClient {
  private tokenOverride: string;

  constructor(session: Session, env: CommonCalendarEnvironmentProps) {
    super(
      env.url,
      session,
      {},
      {
        tokenParameterName: 'token',
      },
    );

    this.tokenOverride = env.token;
  }

  public fetchCalendarData = <T>(
    params: CommonCalendarQueryParams,
    options: CommonCalendarRequestOptions<T> = {},
  ): SafePromise<T> => {
    const urlParams = options.genUrlParams?.(params) ?? genUrlParams(params);
    if (this.tokenOverride) {
      urlParams['token'] = this.tokenOverride;
    }

    const url = this.URL(undefined, urlParams);

    return this.get(url, { allowsAnonymousAuth: true, credentials: options.credentials });
  };
}
