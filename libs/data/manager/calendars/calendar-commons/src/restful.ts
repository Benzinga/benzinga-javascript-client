import { SafePromise } from '@benzinga/safe-await';
import { Session, RestfulClient } from '@benzinga/session';
import { CommonCalendarEnvironmentProps } from './environment';

import { CommonCalendarQueryParams } from './entities';
import { CommonCalendarRequestOptions } from './request';

export class CommonCalendarRestful extends RestfulClient {
  private tokenOverride: string;

  constructor(session: Session, env: CommonCalendarEnvironmentProps) {
    super(
      env.dataUrl,
      session,
      {},
      {
        tokenParameterName: 'token',
      },
    );

    this.tokenOverride = env.token;
  }

  public fetchCalendarData = <T>(
    calendarType: string,
    params: CommonCalendarQueryParams,
    additionalParams: object = {},
    options: CommonCalendarRequestOptions = {},
  ): SafePromise<T> => {
    const urlParams = {
      page: params.page,
      pagesize: params.pageSize,
      parameters: {
        date_from: params.dateFrom,
        date_search_field: params.dateSearchField,
        date_to: params.dateTo,
        importance: 0,
        tickers: params.symbols ? params.symbols.join(',') : null,
        ...additionalParams,
      },
    };

    if (this.tokenOverride) {
      urlParams['token'] = this.tokenOverride;
    }

    const url = this.URL(options.overrideUrl ?? `v2.1/calendar/${calendarType}`, urlParams);

    return this.get(url, { allowsAnonymousAuth: true });
  };
}
