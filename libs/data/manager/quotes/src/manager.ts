import { SafePromise, SafeType } from '@benzinga/safe-await';
import { ExtendedSubscribable, Subscription } from '@benzinga/subscribable';
import {
  DelayedQuotesResponse,
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
} from './entities';
import { QuoteSocketEvent, QuoteSocket } from './socket';
import { QuoteFeedEvent, QuoteFeed, QuoteFeedExtended } from './feed';
import { QuoteStore } from './store';
import { Session } from '@benzinga/session';
import { StockSymbol } from '@benzinga/session';
import { WatchlistQuotesRequest, WatchlistQuotesRequestEvent } from './request';

interface WatchlistQuotesFunctions {
  getDetailedQuotes: QuotesManager['getDetailedQuotes'];
}

interface WatchlistUpdateEvent {
  quotes: DetailedQuotesBySymbol;
  type: 'quote:detailed_quotes';
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
  | WatchlistQuotesRequestEvent
  | WatchlistUpdateEvent
  | ShortInterestUpdateEvent;

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

  constructor(session: Session) {
    super();
    this.socket = new QuoteSocket(session);
    this.store = new QuoteStore();
    this.request = new WatchlistQuotesRequest(session);
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
      return { result: cachedQuotes };
    } else {
      const watchlistQuotes = await this.request.getDetailedQuotes(symbols);
      if (watchlistQuotes.err) {
        return watchlistQuotes;
      } else {
        Object.entries(watchlistQuotes.result).forEach(([key, value]) => this.store.setDetailedQuotes(key, value));
        this.call({
          quotes: watchlistQuotes.result,
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
      const quotesLogo = this.store.getQuotesLogos(symbol);
      if (quotesLogo) {
        numberOfCachedLogos += 1;
        return [...acc, quotesLogo];
      } else {
        return acc;
      }
    }, [] as Logo[]);

    if (numberOfCachedLogos === symbols.length) {
      return { result: cachedLogos };
    } else {
      const response = await this.request.getQuotesLogos(symbols, params);

      if (response.err) {
        return { err: response.err };
      } else {
        if (Array.isArray(response.result)) {
          response.result.forEach(logo => {
            this.store.addQuotesLogos(logo.search_key, logo);
          });
        }
      }

      return { result: response.result.data };
    }
  };

  /**
   * Fetch delayed quotes data for given symbols from server
   *
   * @param {StockSymbol[]} symbols
   * @memberof QuotesManager
   */
  public getDelayedQuotes = async (symbols: StockSymbol[]): SafePromise<DelayedQuotesResponse> => {
    return await this.request.getDelayedQuotes(symbols);
  };

  /**
   * Fetch ticker details for given symbols from server
   *
   * @param {StockSymbol[]} symbols
   * @memberof QuotesManager
   */
  public getTickerDetails = async (symbols: StockSymbol[]): SafePromise<TickerDetailsResponse> => {
    return await this.request.getTickerDetails(symbols);
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
      return { result: cachedQuotes };
    } else {
      const shortInterestQuotes = await this.request.getShortInterest(params);
      if (shortInterestQuotes.err) {
        return shortInterestQuotes;
      } else {
        this.store.setShortInterest(params, shortInterestQuotes.result);
        this.call({
          quotes: shortInterestQuotes.result,
          type: 'quote:short_interest_quotes',
        });
        return { ...cachedQuotes, ...shortInterestQuotes };
      }
    }
  };

  protected onFirstSubscription = (): void => {
    this.socketSubscription = this.socket.listen(event => this.call(event));
    this.requestSubscription = this.request.listen(event => this.call(event));
  };

  protected onZeroSubscriptions = (): void => {
    this.socketSubscription?.unsubscribe();
    this.requestSubscription?.unsubscribe();
  };

  protected onSubscribe = (): WatchlistQuotesFunctions => ({
    getDetailedQuotes: this.getDetailedQuotes,
  });
}
