import { QuoteFeedExtended } from './feed';
import {
  DetailedQuote,
  ShortInterestParams,
  ShortInterestsDataSet,
  Logo,
  SymbolType,
  DelayedQuote,
  TickerDetail,
  GetQuotesLogoParams,
} from './entities';
import { StockSymbol } from '@benzinga/session';

export class QuoteStore {
  private quoteFeeds = new Map<SymbolType, QuoteFeedExtended>();
  private activeQuoteFeeds = new Set<QuoteFeedExtended>();
  private detailedQuotes = new Map<SymbolType, DetailedQuote>();
  private delayedQuotes = new Map<SymbolType, DelayedQuote>();
  private quotesLogos = new Map<SymbolType, Logo>();
  private tickerDetails = new Map<StockSymbol, TickerDetail>();
  private shortInterestQuotes = new WeakMap<ShortInterestParams, ShortInterestsDataSet>();

  public addQuoteFeed = (quoteFeed: QuoteFeedExtended): QuoteFeedExtended => {
    this.quoteFeeds.set(quoteFeed.getSecurities(), quoteFeed);
    return quoteFeed;
  };

  public removeQuoteFeed = (symbol: SymbolType): void => {
    this.quoteFeeds.delete(symbol);
  };

  public addActiveQuoteFeed = (quoteFeed: QuoteFeedExtended): QuoteFeedExtended => {
    this.activeQuoteFeeds.add(quoteFeed);
    return quoteFeed;
  };

  public removeActiveQuoteFeed = (quoteFeed: QuoteFeedExtended): void => {
    this.activeQuoteFeeds.delete(quoteFeed);
  };

  public getQuoteFeeds = (): QuoteFeedExtended[] => {
    return Array.from(this.quoteFeeds.values());
  };

  public getActiveQuoteFeeds = (): QuoteFeedExtended[] => {
    return Array.from(this.activeQuoteFeeds.values());
  };

  public hasQuoteFeed = (symbol: SymbolType): boolean => {
    return this.quoteFeeds.has(symbol);
  };

  public getQuoteFeed = (symbol: SymbolType): QuoteFeedExtended | undefined => {
    return this.quoteFeeds.get(symbol);
  };

  public getDetailedQuotes = (symbol: SymbolType): DetailedQuote | undefined => {
    return this.detailedQuotes.get(symbol);
  };

  public setDetailedQuotes = (symbol: SymbolType, quote: DetailedQuote): void => {
    this.detailedQuotes.set(symbol, quote);
  };

  public getDelayedQuotes = (): Map<string, DelayedQuote> => {
    return this.delayedQuotes;
  };

  public getDelayedQuote = (symbol: SymbolType): DelayedQuote | undefined => {
    return this.delayedQuotes.get(symbol);
  };

  public setDelayedQuotes = (symbol: SymbolType, quote: DelayedQuote): void => {
    this.delayedQuotes.set(symbol, quote);
  };

  public addQuotesLogos = (symbol: SymbolType, params: GetQuotesLogoParams | undefined, logo: Logo): void => {
    if (params === undefined) {
      this.quotesLogos.set(symbol, logo);
    } else {
      this.quotesLogos.set(JSON.stringify({ ...params, symbol }), logo);
    }
  };

  public getQuotesLogos = (symbol: SymbolType, params: GetQuotesLogoParams | undefined): Logo | undefined => {
    if (params === undefined) {
      return this.quotesLogos.get(symbol);
    } else {
      return this.quotesLogos.get(JSON.stringify({ ...params, symbol }));
    }
  };

  public getShortInterest = (params: ShortInterestParams): ShortInterestsDataSet | undefined => {
    return this.shortInterestQuotes.get(params);
  };

  public setShortInterest = (params: ShortInterestParams, quotes: ShortInterestsDataSet): void => {
    this.shortInterestQuotes.set(params, quotes);
  };

  public getTickerDetails = (symbol: StockSymbol): TickerDetail | undefined => {
    return this.tickerDetails.get(symbol);
  };

  public setTickerDetails = (details: TickerDetail): void => {
    this.tickerDetails.set(details.symbol, details);
  };
}
