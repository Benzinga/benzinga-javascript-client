import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import { TickerDetailsResponse } from '../entities';
import { Session } from '@benzinga/session';
import { StockSymbol } from '@benzinga/session';
import { QuotesEnvironment } from '../environment';

export class QuotesTickerRestful extends RestfulClient {
  constructor(session: Session) {
    super(session.getEnvironment(QuotesEnvironment).tickersUrl, session, {
      authorization: true,
      // 'x-device-key': true,
    });
  }

  getTickerDetails = async (symbols: StockSymbol): SafePromise<TickerDetailsResponse> => {
    const url = this.URL(`v3/tickerDetail`, {
      apikey: this.session.getEnvironment(QuotesEnvironment).tickersKey,
      symbols,
    });

    return this.get(url, {
      allowsAnonymousAuth: true,
      credentials: 'same-origin',
    });
  };
}
