import { SafePromise, SafeType } from '@benzinga/safe-await';
import { ExtendedSubscribable, Subscription } from '@benzinga/subscribable';
import {
  Logo,
  Quote,
  QuoteDetail,
  ScheduleResponse,
  Security,
  TickerDetailsResponse,
  ShortInterestParams,
  ShortInterestsDataSet,
  DetailedQuotesBySymbol,
  GetQuotesLogoParams,
  DelayedQuote,
  TickerDetail,
} from './entities';
import { QuoteSocketEvent, QuoteSocket } from './socket';
import { QuoteFeedEvent, QuoteFeed, QuoteFeedExtended } from './feed';
import { QuoteStore } from './store';
import { Session } from '@benzinga/session';
import { StockSymbol } from '@benzinga/session';
import { WatchlistQuotesRequest, WatchlistQuotesRequestEvent } from './request';
import { QuoteFeedRestful, QuoteFeedRestfulEvent } from './feedRestful';

interface WatchlistQuotesFunctions {
  getDetailedQuotes: QuotesManager['getDetailedQuotes'];
}

interface WatchlistUpdateEvent {
  quotes: DetailedQuotesBySymbol;
  type: 'quote:detailed_quotes';
}

interface TickerDetailEvent {
  detail: TickerDetail[];
  type: 'quote:ticker_details_quotes';
}
/**
 * Event fired when short interest quotes were updated
 *
 * @event
 *
 * @interface ShortInterestUpdateEvent
 */
interface ShortInterestUpdateEvent {
  quotes: ShortInterestsDataSet;
  type: 'quote:short_interest_quotes';
}

export type QuotesManagerEvent =
  | QuoteSocketEvent
  | QuoteFeedEvent
  | QuoteFeedRestfulEvent
  | WatchlistQuotesRequestEvent
  | WatchlistUpdateEvent
  | ShortInterestUpdateEvent
  | TickerDetailEvent;

/**
 * Quotes manager
 *
 * Main class for working with Quotes API
 *
 * To use, obtain an instance by calling session.getManager(QuotesManager)
 *
 * @export
 * @class QuotesManager
 * @extends {ExtendedSubscribable<QuotesManagerEvent, WatchlistQuotesFunctions>}
 */
export class QuotesManager extends ExtendedSubscribable<QuotesManagerEvent, WatchlistQuotesFunctions> {
  private socket: QuoteSocket;
  private socketSubscription?: Subscription<QuoteSocket>;

  private store: QuoteStore;
  private request: WatchlistQuotesRequest;
  private requestSubscription?: Subscription<WatchlistQuotesRequest>;

  private feedRestful: QuoteFeedRestful;
  private feedRestfulSubscription?: Subscription<QuoteFeedRestful>;

  constructor(session: Session) {
    super();
    this.socket = new QuoteSocket(session);
    this.store = new QuoteStore();
    this.request = new WatchlistQuotesRequest(session);
    this.feedRestful = new QuoteFeedRestful(session, this.store);
  }

  /**
   * @internal
   */
  public static getName = () => 'benzinga-quotes';

  /**
   * Do not use store directly! Use methods in the manger itself to query data
   *
   * @internal
   */
  public getStore(): QuoteStore {
    return this.store;
  }

  /**
   * Get quote for given security from cache (if exists)
   *
   * @param {Security} security
   * @memberof QuotesManager
   */
  public getCachedQuote = (security: Security): Quote | undefined => {
    const quoteFeed = this.store.getQuoteFeed(security);

    if (quoteFeed) {
      return quoteFeed.getQuote();
    } else {
      return undefined;
    }
  };

  /**
   * Get quote detail for given security from cache (if exists)
   *
   * @param {Security} security
   * @memberof QuotesManager
   */
  public getCachedQuoteDetail = (security: Security): QuoteDetail | undefined => {
    const quoteFeed = this.store.getQuoteFeed(security);

    if (quoteFeed) {
      return quoteFeed.getDetail();
    } else {
      return undefined;
    }
  };

  /**
   * Create a feed for given quote security
   *
   * For each security there is only one feed created, so multiple calls will return the same instance
   *
   * @param {Security} security
   * @memberof QuotesManager
   */
  public createQuoteFeed = (security: Security): QuoteFeed => {
    const quoteFeed = this.store.getQuoteFeed(security);
    if (quoteFeed) {
      return quoteFeed;
    } else {
      return this.store.addQuoteFeed(new QuoteFeedExtended(this.socket.createSession(security), this.store));
    }
  };

  /**
   * Get detailed quotes for given symbols
   *
   * Note that this method wil use cache as much as possible
   *
   * @param {StockSymbol[]} symbols
   * @memberof QuotesManager
   */
  public getDetailedQuotes = async (symbols: StockSymbol[]): SafePromise<DetailedQuotesBySymbol> => {
    let numberOfCachedQuotes = 0;
    const cachedQuotes = symbols.reduce((acc, symbol) => {
      const detailedQuote = this.store.getDetailedQuotes(symbol);
      if (detailedQuote) {
        numberOfCachedQuotes += 1;
        return { ...acc, [symbol]: detailedQuote };
      } else {
        return acc;
      }
    }, {});

    if (numberOfCachedQuotes === symbols.length) {
      return { ok: cachedQuotes };
    } else {
      const watchlistQuotes = await this.request.getDetailedQuotes(symbols);
      if (watchlistQuotes.err) {
        return watchlistQuotes;
      } else {
        Object.entries(watchlistQuotes.ok).forEach(([key, value]) => this.store.setDetailedQuotes(key, value));
        this.dispatch({
          quotes: watchlistQuotes.ok,
          type: 'quote:detailed_quotes',
        });
        return { ...cachedQuotes, ...watchlistQuotes };
      }
    }
  };

  /**
   * Get quotes logo for given symbols and params
   *
   * Will use internal cache when possible
   *
   * @param {StockSymbol[]} symbols
   * @param {GetQuotesLogoParams} [params]
   * @memberof QuotesManager
   */
  public getQuotesLogos = async (
    symbols: StockSymbol[],
    params?: GetQuotesLogoParams,
  ): SafePromise<Logo[] | SafeType<Logo[]>> => {
    let numberOfCachedLogos = 0;
    const cachedLogos = symbols.reduce((acc, symbol) => {
      const quotesLogo = this.store.getQuotesLogos(symbol, params);
      if (quotesLogo) {
        numberOfCachedLogos += 1;
        return [...acc, quotesLogo];
      } else {
        return acc;
      }
    }, [] as Logo[]);

    if (numberOfCachedLogos === symbols.length) {
      return { ok: cachedLogos };
    } else {
      const response = await this.request.getQuotesLogos(symbols, params);

      if (response.err) {
        return { err: response.err };
      } else {
        if (Array.isArray(response.ok)) {
          response.ok.forEach(logo => {
            this.store.addQuotesLogos(logo.search_key, params, logo);
          });
        }
      }

      return { ok: response.ok.data };
    }
  };
  public getQuotesLogosCached = (symbols: StockSymbol, params?: GetQuotesLogoParams): Logo | undefined =>
    this.store.getQuotesLogos(symbols, params);

  /**
   * Fetch delayed quotes data for given symbols from server
   *
   * @param {StockSymbol[]} symbols
   * @memberof QuotesManager
   */
  public getDelayedQuotes = async (symbols: StockSymbol[]): SafePromise<Record<StockSymbol, DelayedQuote>> => {
    return await this.request.getDelayedQuotes(symbols);
  };

  /**
   * Fetch ticker details for given symbols from server
   *
   * @param {StockSymbol[]} symbols
   * @memberof QuotesManager
   */
  public getTickerDetailsCache = (symbol: StockSymbol): TickerDetail | undefined => this.store.getTickerDetails(symbol);
  public getTickerDetails = async (symbols: StockSymbol[]): SafePromise<TickerDetailsResponse> => {
    const cachedQuotes = symbols.reduce<TickerDetail[]>((acc, symbol) => {
      const shortInterestQuote = this.store.getTickerDetails(symbol);
      if (shortInterestQuote) {
        acc.push(shortInterestQuote);
      }
      return acc;
    }, []);

    if (symbols && cachedQuotes.length === symbols.length) {
      return { ok: { result: cachedQuotes } };
    } else {
      const shortInterestQuotes = await this.request.getTickerDetails(symbols);
      if (shortInterestQuotes.err) {
        return shortInterestQuotes;
      } else {
        shortInterestQuotes.ok.result.forEach(detail => this.store.setTickerDetails(detail));
        this.dispatch({
          detail: shortInterestQuotes.ok.result,
          type: 'quote:ticker_details_quotes',
        });
        return shortInterestQuotes;
      }
    }
  };

  /**
   * Fetch quotes schedule from server
   *
   * @memberof QuotesManager
   */
  public getSchedule = async (): SafePromise<ScheduleResponse> => {
    return await this.request.getSchedule();
  };

  /**
   * Get detailed quotes from cache.
   *
   * If detailed quote for requested symbol is not cached, it won't be in the result
   *
   * @param {StockSymbol[]} symbols
   * @memberof QuotesManager
   */
  public getDetailedQuotesCached = (symbols: StockSymbol[]): DetailedQuotesBySymbol => {
    return symbols.reduce((acc, symbol) => {
      const detailedQuote = this.store.getDetailedQuotes(symbol);
      if (detailedQuote) {
        return { ...acc, [symbol]: detailedQuote };
      } else {
        return acc;
      }
    }, {});
  };

  /**
   * Get short interest data
   *
   * Will use cache when possible
   *
   * @param {ShortInterestParams} params
   * @memberof QuotesManager
   */
  public getShortInterest = async (params: ShortInterestParams): SafePromise<ShortInterestsDataSet> => {
    let numberOfCachedQuotes = 0;
    let cachedQuotes = {};
    if (params.symbols) {
      cachedQuotes = params.symbols.reduce((acc, symbol) => {
        const shortInterestQuote = this.store.getShortInterest(params);
        if (shortInterestQuote) {
          numberOfCachedQuotes += 1;
          return { ...acc, [symbol]: shortInterestQuote };
        } else {
          return acc;
        }
      }, {});
    }
    if (params.symbols && numberOfCachedQuotes === params.symbols.length) {
      return { ok: cachedQuotes };
    } else {
      const shortInterestQuotes = await this.request.getShortInterest(params);
      if (shortInterestQuotes.err) {
        return shortInterestQuotes;
      } else {
        this.store.setShortInterest(params, shortInterestQuotes.ok);
        this.dispatch({
          quotes: shortInterestQuotes.ok,
          type: 'quote:short_interest_quotes',
        });
        return { ...cachedQuotes, ...shortInterestQuotes };
      }
    }
  };

  public addSymbolSubscription(symbol: string): DelayedQuote | undefined {
    const quote = this.feedRestful.getQuote(symbol);
    if (quote) {
      return quote;
    } else {
      this.feedRestful.addSymbolSubscription(symbol);
      return undefined;
    }
  }

  public getQuoteFromSubscriptionStore(symbol: string): DelayedQuote | undefined {
    const quote = this.feedRestful.getQuote(symbol);
    return quote;
  }

  public addSymbolsSubscription(symbols: string[]): void {
    this.feedRestful.addSymbolsSubscription(symbols);
  }

  public removeSymbolSubscription(symbol: string): void {
    this.feedRestful.removeSymbolSubscription(symbol);
  }

  public removeSymbolsSubscription(symbols: string[]): void {
    this.feedRestful.removeSymbolsSubscription(symbols);
  }

  protected onFirstSubscription = (): void => {
    this.socketSubscription = this.socket.listen(event => this.dispatch(event));
    this.requestSubscription = this.request.listen(event => this.dispatch(event));
    this.feedRestfulSubscription = this.feedRestful.listen(event => this.dispatch(event));
  };

  protected onZeroSubscriptions = (): void => {
    this.socketSubscription?.unsubscribe();
    this.requestSubscription?.unsubscribe();
    this.feedRestfulSubscription?.unsubscribe();
  };

  protected onSubscribe = (): WatchlistQuotesFunctions => ({
    getDetailedQuotes: this.getDetailedQuotes,
  });
}
