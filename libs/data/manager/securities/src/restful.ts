import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import { IncomingSecuritiesResult } from './ingest';
import { Session } from '@benzinga/session';
import { SecuritiesEnvironment } from './environment';
import { FinancialsQuery } from './entities';

export class SecuritiesRestful extends RestfulClient {
  constructor(session: Session) {
    super(
      session.getEnvironment(SecuritiesEnvironment).url,
      session,
      {
        authorizationSession: true,
        'x-device-key': true,
      },
      {
        tokenParameterName: 'apikey',
      },
    );
  }

  getFinancials = (query: FinancialsQuery): SafePromise<IncomingSecuritiesResult> => {
    const url = this.URL('v3/fundamentals', {
      apikey: this.session.getEnvironment(SecuritiesEnvironment).key,
      ...query,
    });
    return this.debouncedGet(url, { allowsAnonymousAuth: true, credentials: 'same-origin' });
  };

  getCompany = (symbol: string): SafePromise<IncomingSecuritiesResult> => {
    const url = this.URL(`/api/v2.1/fundamentals/company`, {
      symbols: symbol,
      token: this.session.getEnvironment(SecuritiesEnvironment).key, //TODO: Do not use this API Key in production, change the KEY once be ready
    });
    return this.debouncedGet(url, { credentials: 'same-origin' });
  };
}
