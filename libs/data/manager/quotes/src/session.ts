import { Subscribable, Subscription } from '@benzinga/subscribable';
import { QuoteSocket, QuoteSocketEvent } from './socket';
import { IncomingQuote, QuoteDetail, Security } from './entities';
import { StockSymbol } from '@benzinga/session';

interface QuoteEvent {
  quote: IncomingQuote;
  type: 'quote:quote';
}

export interface InitialQuoteEvent {
  detail: QuoteDetail;
  quote: IncomingQuote;
  type: 'quote:initial_quote';
}

export interface InitialDetailQuoteEvent {
  detail: QuoteDetail;
  symbol: StockSymbol;
  type: 'quote:initial_detail_quote';
}

export type QuoteSessionEvents = QuoteEvent | InitialQuoteEvent | InitialDetailQuoteEvent;
export class QuoteSession extends Subscribable<QuoteSessionEvents> {
  private socket: QuoteSocket;
  private security: Security;
  private socketSubscription?: Subscription<QuoteSocket>;

  constructor(quoteSocket: QuoteSocket, security: Security) {
    super();
    this.socket = quoteSocket;
    this.security = security;
  }

  public getSecurity = (): Security => this.security;

  protected onFirstSubscription = (): void => {
    this.socketSubscription = this.socket.subscribe(this.socketCallback);
    this.socket.startSession(this);
  };

  protected onZeroSubscriptions = (): void => {
    this.socket.endSession(this);
    this.socketSubscription?.unsubscribe();
    this.socketSubscription = undefined;
  };

  private socketCallback = (event: QuoteSocketEvent): void => {
    switch (event.type) {
      case 'quote:initial_detail_quote':
        if (event.symbol === this.security) {
          this.call(event);
        }
        break;
      case 'quote:initial_quote':
      case 'quote:quote':
        if (event.quote.symbol === this.security) {
          Object.entries(event.quote).forEach(([key, value]) =>
            Number.isNaN(value) || value === 'NaN'
              ? ((event.quote[key as keyof IncomingQuote] as null) = null)
              : ((event.quote[key as keyof IncomingQuote] as typeof value) = value),
          );
          this.call(event);
        }
        break;
      case 'reconnected':
        this.socket.startSession(this);
        break;
    }
  };
}
