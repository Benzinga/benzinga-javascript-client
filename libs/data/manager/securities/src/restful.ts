import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import {
  IncomingSecuritiesResult,
  IncomingOwnershipResult,
  IncomingPeersResult,
  IncomingInsidersResult,
} from './ingest';
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

  getOwnership = (symbol: string): SafePromise<IncomingOwnershipResult> => {
    const url = this.URL(`/rest/v3/ownership/summary`, {
      apikey: this.session.getEnvironment(SecuritiesEnvironment).key,
      symbols: symbol,
    });
    return this.debouncedGet(url, {
      credentials: 'same-origin',
      includeHeader: { authorizationSession: false, 'x-device-key': false },
    });
  };

  getPeers = (symbol: string): SafePromise<IncomingPeersResult> => {
    const fields = [
      'symbol',
      'name',
      'pe',
      'forwardPERatio',
      'marketCap',
      'shareFloat',
      'sharesOutstanding',
      'dividend',
      'dividendYield',
      'revenueTTM',
      'exchange',
    ].join(',');

    const url = this.URL(`/rest/v3/peers`, {
      apikey: this.session.getEnvironment(SecuritiesEnvironment).key,
      fields: fields,
      symbol: symbol,
    });
    return this.debouncedGet(url, {
      credentials: 'same-origin',
      includeHeader: { authorizationSession: false, 'x-device-key': false },
    });
  };

  getInsiders = (symbol: string): SafePromise<IncomingInsidersResult> => {
    const url = this.URL(
      new URL(
        'insider-trades/api/pro/insider-trades',
        this.session.getEnvironment(SecuritiesEnvironment).insiderUrl,
      ).toString(),
      {
        company_ticker: symbol,
      },
    );
    return this.debouncedGet(url, { credentials: 'same-origin' });
  };
}
