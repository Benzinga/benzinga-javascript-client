import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import { DelayedQuote } from '../entities';
import { Session } from '@benzinga/session';
import { StockSymbol } from '@benzinga/session';
import { QuotesEnvironment } from '../environment';

export class QuotesDelayedRestful extends RestfulClient {
  constructor(session: Session) {
    super(
      session.getEnvironment(QuotesEnvironment).delayedQuoteUrl,
      session,
      { 'x-device-key': true },
      {
        tokenParameterName: 'apikey',
      },
    );
  }

  getDelayedQuotes = async (symbols: StockSymbol): SafePromise<Record<StockSymbol, DelayedQuote>> => {
    const url = this.URL(`v2/quoteDelayed`, {
      apikey: this.session.getEnvironment(QuotesEnvironment).delayedQuoteKey,
      symbols,
    });

    return this.get(url, { allowsAnonymousAuth: true, credentials: 'same-origin' });
  };
}
