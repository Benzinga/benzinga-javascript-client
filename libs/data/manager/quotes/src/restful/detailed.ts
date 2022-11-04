import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import { DetailedQuotesBySymbol } from '../entities';
import { Session } from '@benzinga/session';
import { StockSymbol } from '@benzinga/session';
import { QuotesEnvironment } from '../environment';

export class DetailedQuotesRestful extends RestfulClient {
  constructor(session: Session) {
    super(session.getEnvironment(QuotesEnvironment).symbolsUrl, session, {
      authorizationSession: true,
      'x-device-key': true,
    });
  }

  getDetailedQuotes = async (symbols: StockSymbol): SafePromise<DetailedQuotesBySymbol> => {
    const url = this.URL(`v2/quote`, {
      apikey: this.session.getEnvironment(QuotesEnvironment).symbolsKey,
      symbols,
    });
    return this.get(url, {
      allowsAnonymousAuth: true,
      credentials: 'same-origin',
    });
  };
}
