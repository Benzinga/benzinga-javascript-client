import { ExtendedSubscribable, Subscription } from '@benzinga/subscribable';
import { floatSubtract, formatPrice, roundHalfEvenTwoDecimals } from '@benzinga/utils';
import { QuoteSession, QuoteSessionEvents } from './session';
import { IncomingQuote, Quote, QuoteDetail, Security } from './entities';
import { QuoteStore } from './store';

/**
 * Event fired by feed when there is an update for a quote
 *
 * Quote object will contain additional data for price and volume
 *
 * @event
 * @interface QuoteEvent
 */
interface QuoteEvent {
  quote: Quote;
  type: 'quote:quote';
}

/**
 * Event fired when quote detail is updated
 *
 * Detail object will contain additional data for price and volume
 *
 * @event
 * @interface QuoteDetailEvent
 */
interface QuoteDetailEvent {
  detail: QuoteDetail;
  type: 'quote:quote_details';
}

interface QuoteFunctions {
  getDetail: QuoteFeed['getDetail'];
  getQuote: QuoteFeed['getQuote'];
  getSecurities: QuoteFeed['getSecurities'];
}

export type QuoteFeedEvent = QuoteEvent | QuoteDetailEvent;

/**
 * Feed for receiving data regarding quotes in real time
 *
 * Subscribe to needed events to receive respectful updates
 *
 * @export
 * @class QuoteFeed
 * @extends {ExtendedSubscribable<QuoteFeedEvent, QuoteFunctions>}
 */
export class QuoteFeed extends ExtendedSubscribable<QuoteFeedEvent, QuoteFunctions> {
  protected sessions: QuoteSession;
  protected sessionsSubscription?: Subscription<QuoteSession>;
  protected store: QuoteStore;
  protected detail?: QuoteDetail;
  protected quote?: Quote;

  constructor(sessions: QuoteSession, store: QuoteStore) {
    super();
    this.sessions = sessions;
    this.store = store;
  }

  public getDetail = (): QuoteDetail | undefined => this.detail;
  public getQuote = (): Quote | undefined => this.quote;
  public getSecurities = (): Security => this.sessions.getSecurity();

  protected onSubscribe = (): QuoteFunctions => ({
    getDetail: this.getDetail,
    getQuote: this.getQuote,
    getSecurities: this.getSecurities,
  });

  protected socketCallback = (event: QuoteSessionEvents): void => {
    switch (event.type) {
      case 'quote:initial_detail_quote':
        this.detail = event.detail;
        this.dispatch({ detail: this.detail, type: 'quote:quote_details' });
        break;
      case 'quote:initial_quote':
        this.detail = event.detail;
        this.dispatch({ detail: this.detail, type: 'quote:quote_details' });
        this.quote = { ...this.quote, ...this.getCurrentPriceAndVolume(event.quote) };
        this.dispatch({ quote: this.quote, type: 'quote:quote' });
        break;
      case 'quote:quote':
        this.quote = { ...this.quote, ...this.getCurrentPriceAndVolume(event.quote) };
        this.dispatch({ quote: this.quote, type: 'quote:quote' });
        break;
    }
  };

  private calculateChangeAndChangePercent(n1?: number | null, n2?: number | null) {
    if (n1 && n2) {
      const change = floatSubtract(n1, n2);
      const changePercent = (change / n2) * 100;
      return [change, roundHalfEvenTwoDecimals(changePercent)];
    } else {
      return [undefined, undefined];
    }
  }

  // TODO when everyone is on quote.version=2 this can be simplified

  /**
   * Returns current price and volume as a Quote entity
   *
   * @private
   * @param {IncomingQuote} quote
   * @memberof QuoteFeed
   */
  private getCurrentPriceAndVolume = (quote: IncomingQuote): Quote => {
    const currentPrice = quote.lastTradePrice;
    const currentVolume = (() => {
      switch (quote.sessionType) {
        case 'NA':
        case 'REGULAR':
        default:
          return quote.volume;
        case 'PRE_MARKET':
          return quote.preMarketVolume;
        case 'AFTER_MARKET':
          return quote.afterMarketVolume;
      }
    })();

    const lastTradeTime = quote.lastTradeTime && new Date(Number(quote.lastTradeTime)).toISOString();

    const regHourPrice = quote.sessionType === 'REGULAR' ? quote.lastTradePrice : quote.close;
    const regularHourStart = quote.previousClose;
    const [regularHoursChange, regularHoursPercentChange] = this.calculateChangeAndChangePercent(
      regHourPrice,
      regularHourStart,
    );

    const extendedHoursStart = quote.sessionType === 'PRE_MARKET' ? quote.close : quote.previousClose;
    const [change, percentChange] = this.calculateChangeAndChangePercent(currentPrice, extendedHoursStart);

    const prePostHoursStart = quote.sessionType === 'REGULAR' ? quote.previousClose : quote.close;
    const prePostHoursCurrent = quote.sessionType === 'REGULAR' ? quote.open : currentPrice;
    const [postToPreChange, postToPrePercentChange] = this.calculateChangeAndChangePercent(
      prePostHoursCurrent,
      prePostHoursStart,
    );

    const currentPriceFormatted = quote.lastTradePrice ? formatPrice(quote.lastTradePrice) : '';

    return {
      ...quote,
      change,
      currentPrice,
      currentPriceFormatted,
      currentVolume,
      lastTradeTime,
      percentChange,
      postToPreChange,
      postToPrePercentChange,
      regularHoursChange,
      regularHoursPercentChange,
    };
  };
}

export class QuoteFeedExtended extends QuoteFeed {
  public updateSession = (sessions: QuoteSession): void => {
    this.sessions = sessions;
    if (this.hasSubscribers()) {
      this.sessionsSubscription?.unsubscribe();
      this.sessionsSubscription = this.sessions.subscribe(this.socketCallback);
    }
  };

  protected onFirstSubscription = (): void => {
    this.sessionsSubscription = this.sessions.subscribe(this.socketCallback);
    this.store.addActiveQuoteFeed(this);
  };

  protected onZeroSubscriptions = (): void => {
    this.sessionsSubscription?.unsubscribe();
    this.sessionsSubscription = undefined;
    this.store.removeActiveQuoteFeed(this);
  };
}
