import { SafeError, SafePromise } from '@benzinga/safe-await';
import { ExtendedListenableSubscribable } from '@benzinga/subscribable';

import {
  DelayedQuotesResponse,
  Logo,
  ScheduleResponse,
  ShortInterestParams,
  ShortInterestResponse,
  ShortInterestsDataSet,
  TickerDetailsResponse,
  DetailedQuotesBySymbol,
  GetQuotesLogoParams,
} from './entities';
import {
  QuotesScheduleRestful,
  QuotesDelayedRestful,
  QuotesTickerRestful,
  InterestRestful,
  DetailedQuotesRestful,
  QuotesLogosRestful,
  //QuotesSymbolRestful,
} from './restful';
import { Session } from '@benzinga/session';
import { StockSymbol } from '@benzinga/session';

interface ErrorEvent {
  error?: SafeError;
  errorType:
    | 'get_detailed_quotes_error'
    | 'get_logos_error'
    | 'get_delayed_quotes_error'
    | 'get_ticker_details_error'
    | 'get_short_interest_error';
  type: 'error';
}

interface WatchlistQuotesEvent {
  type: 'get_detailed_quotes';
  watchlistQuotes: DetailedQuotesBySymbol;
}

interface ShortInterestEvent {
  type: 'get_short_interest';
  shortInterest: ShortInterestResponse;
}

interface LogoQuotesEvent {
  logos: Logo[];
  type: 'get_quotes_logos';
}

interface DelayedQuotesEvent {
  quotes: DelayedQuotesResponse;
  type: 'get_delayed_quotes';
}
interface TickerDetailsEvent {
  result: TickerDetailsResponse;
  type: 'get_ticker_details';
}

export type WatchlistQuotesRequestEvent =
  | ErrorEvent
  | WatchlistQuotesEvent
  | LogoQuotesEvent
  | DelayedQuotesEvent
  | TickerDetailsEvent
  | ShortInterestEvent;

interface WatchlistQuotesFunctions {
  getDelayedQuotes: WatchlistQuotesRequest['getDelayedQuotes'];
  getDetailedQuotes: WatchlistQuotesRequest['getDetailedQuotes'];
  getQuotesLogos: WatchlistQuotesRequest['getQuotesLogos'];
  getTickerDetails: WatchlistQuotesRequest['getTickerDetails'];
  getShortInterest: WatchlistQuotesRequest['getShortInterest'];
}

export class WatchlistQuotesRequest extends ExtendedListenableSubscribable<
  WatchlistQuotesRequestEvent,
  WatchlistQuotesFunctions
> {
  //private restful: QuotesSymbolRestful;
  private scheduleRestful: QuotesScheduleRestful;
  private delayedRestful: QuotesDelayedRestful;
  private tickerRestful: QuotesTickerRestful;
  private interestRestful: InterestRestful;
  private detailedQuotesRestful: DetailedQuotesRestful;
  private logosRestful: QuotesLogosRestful;

  constructor(session: Session) {
    super();
    //this.restful = new QuotesSymbolRestful(session);
    this.scheduleRestful = new QuotesScheduleRestful(session);
    this.delayedRestful = new QuotesDelayedRestful(session);
    this.detailedQuotesRestful = new DetailedQuotesRestful(session);
    this.tickerRestful = new QuotesTickerRestful(session);
    this.interestRestful = new InterestRestful(session);
    this.logosRestful = new QuotesLogosRestful(session);
  }

  public getDetailedQuotes = async (symbols: StockSymbol[]): SafePromise<DetailedQuotesBySymbol> => {
    const watchlistQuotes = await this.detailedQuotesRestful.getDetailedQuotes(symbols.toString());

    if (watchlistQuotes.err) {
      this.call({
        error: watchlistQuotes.err,
        errorType: 'get_detailed_quotes_error',
        type: 'error',
      });
    } else {
      this.call({
        type: 'get_detailed_quotes',
        watchlistQuotes: watchlistQuotes.result,
      });
    }
    return watchlistQuotes;
  };

  public getQuotesLogos = async (
    symbols: StockSymbol[],
    params?: GetQuotesLogoParams,
  ): SafePromise<{ data: Logo[] }> => {
    const logos = await this.logosRestful.getQuotesLogos(symbols.toString(), params);

    if (logos.err) {
      this.call({
        error: logos.err,
        errorType: 'get_logos_error',
        type: 'error',
      });
      return logos;
    } else {
      this.call({
        logos: logos.result.data,
        type: 'get_quotes_logos',
      });
      return logos;
    }
  };

  public getDelayedQuotes = async (symbols: StockSymbol[]): SafePromise<DelayedQuotesResponse> => {
    const delayedQuotes = await this.delayedRestful.getDelayedQuotes(symbols.toString());

    if (delayedQuotes.err) {
      this.call({
        error: delayedQuotes.err,
        errorType: 'get_delayed_quotes_error',
        type: 'error',
      });
      return { err: delayedQuotes.err };
    } else {
      this.call({
        quotes: delayedQuotes.result,
        type: 'get_delayed_quotes',
      });

      return delayedQuotes;
    }
  };

  public getTickerDetails = async (symbols: StockSymbol[]): SafePromise<TickerDetailsResponse> => {
    const tickerDetails = await this.tickerRestful.getTickerDetails(symbols.toString());

    if (tickerDetails.err) {
      this.call({
        error: tickerDetails.err,
        errorType: 'get_ticker_details_error',
        type: 'error',
      });
      return { err: tickerDetails.err };
    } else {
      this.call({
        result: tickerDetails.result,
        type: 'get_ticker_details',
      });

      return tickerDetails;
    }
  };

  public getSchedule = async (): SafePromise<ScheduleResponse> => {
    return await this.scheduleRestful.getSchedule();
  };

  public getShortInterest = async (params: ShortInterestParams): SafePromise<ShortInterestsDataSet> => {
    const shortInterests = await this.interestRestful.getShortInterests(params);

    if (shortInterests.err) {
      this.call({
        error: shortInterests.err,
        errorType: 'get_short_interest_error',
        type: 'error',
      });

      return { err: shortInterests.err };
    } else {
      this.call({
        shortInterest: shortInterests.result,
        type: 'get_short_interest',
      });
    }

    return { result: shortInterests?.result?.shortInterestData };
  };

  protected onSubscribe = (): WatchlistQuotesFunctions => ({
    getDelayedQuotes: this.getDelayedQuotes,
    getDetailedQuotes: this.getDetailedQuotes,
    getQuotesLogos: this.getQuotesLogos,
    getShortInterest: this.getShortInterest,
    getTickerDetails: this.getTickerDetails,
  });
}
