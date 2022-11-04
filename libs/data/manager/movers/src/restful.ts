import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
// import { EgressMovers } from './egress';
import { MoversResponse, MoversQuery, MoversScreenerQuery } from './entities';
// import { IncomingMoversResult } from './ingest';
import { Session } from '@benzinga/session';
import { MoversEnvironment } from './environment';

export class MoversRestful extends RestfulClient {
  constructor(session: Session) {
    super(
      session.getEnvironment(MoversEnvironment).url,
      session,
      { 'x-device-key': false },
      {
        tokenParameterName: 'apikey',
      },
    );
  }

  getMovers = (query: MoversQuery): SafePromise<MoversResponse> => {
    const params = Object.assign(query);
    if (query.screenerQuery && typeof query.screenerQuery == 'object') {
      params.screenerQuery = this.buildScreenerQuery(query?.screenerQuery);
    }
    // let key: string | undefined;
    // if ((key = this.session.getEnvironment(MoversEnvironment).key)) params['apikey'] = key; // this should be moved to server side env
    const url = this.URL('movers', params);
    return this.get(url, { allowsAnonymousAuth: true, mode: 'cors' });
  };

  buildScreenerQuery(screenerQuery: MoversScreenerQuery): string {
    const screenerQueryParams = Object.keys(screenerQuery).map((key: string) => {
      const value = Array.isArray(screenerQuery[key]) ? screenerQuery[key].join(',') : screenerQuery[key];
      return `${key}_${value}`;
    });
    return screenerQueryParams.join(';');
  }
}
