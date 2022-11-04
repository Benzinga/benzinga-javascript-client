import { StockSymbol } from '@benzinga/session';

export type Security = string;

export const NO_TRADING = 'NO_TRADING';
export const PRE_MARKET = 'PRE_MARKET';
export const REGULAR = 'REGULAR';
export const AFTER_MARKET = 'AFTER_MARKET';
export type QuoteSessionType = 'AFTER_MARKET' | 'NA' | 'PRE_MARKET' | 'REGULAR' | 'NO_TRADING';

/**
 * Single quote detail
 *
 * @export
 * @interface QuoteDetail
 */
export interface QuoteDetail {
  /**
   * Company name
   *
   * @type {string}
   * @memberof QuoteDetail
   */
  companyName: string;

  /**
   * Currency code
   *
   * @type {string}
   * @memberof QuoteDetail
   */
  currency: string;

  /**
   * Delayed minutes
   *
   * @type {number}
   * @memberof QuoteDetail
   */
  delayedMinutes?: number;

  /**
   * Exchange name
   *
   * @type {string}
   * @memberof QuoteDetail
   */
  exchange: string;

  /**
   * Source of quote
   *
   * None for real-time quotes
   *
   * @type {string}
   * @memberof QuoteDetail
   */
  source?: string; // absent for real-time quotes
}

export interface ErrorQuote {
  error: string;
  symbol: StockSymbol;
}

/**
 * Incoming quote
 *
 * @export
 * @interface IncomingQuote
 */
export interface IncomingQuote {
  /**
   * After Market Price?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  afterMarketPrice?: number | null;
  /**
   * After Market Volume?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  afterMarketVolume?: number | null;
  /**
   * Ask Price?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  askPrice?: number | null;
  /**
   * Bid Price?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  bidPrice?: number | null;
  /**
   * Change?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  change?: number | null;
  /**
   * Close?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  close?: number | null;
  /**
   * Close Date?
   *
   * @type {string | null}
   * @memberof IncomingQuote
   */
  closeDate?: string | null;
  /**
   * Currency?
   *
   * @type {string | null}
   * @memberof IncomingQuote
   */
  currency?: string | null;
  /**
   * Day High?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  dayHigh?: number | null;
  /**
   * Day Low?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  dayLow?: number | null;
  /**
   * Fifty Two Week High?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  fiftyTwoWeekHigh?: number | null;
  /**
   * Fifty Two Week Low?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  fiftyTwoWeekLow?: number | null;
  /**
   * Last Trade Price?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  lastTradePrice?: number | null;
  /**
   * Last Trade Time?
   *
   * @type {string | null}
   * @memberof IncomingQuote
   */
  lastTradeTime?: string | null;
  /**
   * Open?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  open?: number | null;
  /**
   * Percent Change?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  percentChange?: number | null;
  /**
   * Pre Market Price?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  preMarketPrice?: number | null;
  /**
   * Pre Market Volume?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  preMarketVolume?: number | null;
  /**
   * Previous Close?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  previousClose?: number | null;
  /**
   * Session Type?
   *
   * @type {QuoteSessionType | null}
   * @memberof IncomingQuote
   */
  sessionType?: QuoteSessionType | null;
  /**
   * Symbol
   *
   * @type {StockSymbol}
   * @memberof IncomingQuote
   */
  symbol: StockSymbol;
  /**
   * Volume?
   *
   * @type {number | null}
   * @memberof IncomingQuote
   */
  volume?: number | null;
  /**
   * Version?
   *
   * @type {number}
   * @memberof IncomingQuote
   */
  version?: number;
}

/**
 * Initial quote data
 *
 * @export
 * @interface InitialQuote
 */
export interface InitialQuote {
  /**
   * Quote detail
   *
   * @type {QuoteDetail}
   * @memberof InitialQuote
   */
  detail: QuoteDetail;

  /**
   * Quote data
   *
   * @type {IncomingQuote}
   * @memberof InitialQuote
   */
  quote?: IncomingQuote;

  /**
   * Quote symbol
   *
   * @type {string}
   * @memberof InitialQuote
   */
  symbol: string;
}

/**
 * @export
 * @interface DetailsQuote
 */
export interface DetailsQuote {
  /**
   * Ask Price
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  askPrice: number;
  /**
   * Ask Size
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  askSize: number;
  /**
   * Ask Time
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  askTime: number;
  /**
   * Average Volume
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  averageVolume: number;
  /**
   * Bid Price
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  bidPrice: number;
  /**
   * Bid Size
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  bidSize: number;
  /**
   * Bid Time
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  bidTime: number;
  /**
   * Benzinga Exchange
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  bzExchange: string;
  /**
   * Change
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  change: number;
  /**
   * Change Percent
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  changePercent: number;
  /**
   * Close?
   *
   * @type {number | null}
   * @memberof DetailsQuote
   */
  close?: number | null;
  /**
   * Company Standard Name?
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  companyStandardName?: string;
  /**
   * Currency?
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  currency?: string;
  /**
   * Description
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  description: string;
  /**
   * Dividend?
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  dividend?: number;
  /**
   * Dividend Yield?
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  dividendYield?: number;
  /**
   * Dx Symbol
   *
   * @type {StockSymbol}
   * @memberof DetailsQuote
   */
  dxSymbol: StockSymbol;
  /**
   * Eth Price
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  ethPrice: number;
  /**
   * Eth Time
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  ethTime: number;
  /**
   * Eth Volume
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  ethVolume: number;
  /**
   * Exchange
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  exchange: string;
  /**
   * Fifty Day Average Price
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  fiftyDayAveragePrice: number;
  /**
   * Fifty Two Week High
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  fiftyTwoWeekHigh: number;
  /**
   * Fifty Two Week Low
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  fiftyTwoWeekLow: number;
  /**
   * Forward P E?
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  forwardPE?: number;
  /**
   * High
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  high: number;
  /**
   * Industry
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  industry: string;
  /**
   * Iso Exchange
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  isoExchange: string;
  /**
   * Last Trade Price
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  lastTradePrice: number;
  /**
   * Last Trade Time
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  lastTradeTime: number;
  /**
   * Low
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  low: number;
  /**
   * Market Cap
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  marketCap: number;
  /**
   * Name
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  name: string;
  /**
   * Open
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  open: number;
  /**
   * Otc Market?
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  otcMarket?: string;
  /**
   * Otc Tier?
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  otcTier?: string;
  /**
   * Payout Ratio?
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  payoutRatio?: number;
  /**
   * Pe?
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  pe?: number;
  /**
   * Previous Close Date?
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  previousCloseDate?: string;
  /**
   * Previous Close Price
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  previousClosePrice: number;
  /**
   * Sector
   *
   * @type {string}
   * @memberof DetailsQuote
   */
  sector: string;
  /**
   * Shares Float?
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  sharesFloat?: number;
  /**
   * Shares Outstanding?
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  sharesOutstanding?: number;
  /**
   * Size
   *
   * @type {number}
   * @memberof DetailsQuote
   */
  size: number;
  /**
   * Symbol
   *
   * @type {StockSymbol}
   * @memberof DetailsQuote
   */
  symbol: StockSymbol;
  /**
   * Type
   *
   * @type {DetailsQuoteType}
   * @memberof DetailsQuote
   */
  type: DetailsQuoteType;
  /**
   * Volume
   *
   * @type {number}
   * @memberof DetailsQuote
   */

  volume: number;

  /**
   * @type {{
   *     code: number;
   *     message: string;
   *   }}
   * @memberof DetailsQuote
   */
  error?: {
    code: number;
    message: string;
  };
}

export interface DetailedQuotesBySymbol {
  [symbol: string]: DetailsQuote;
}

export interface Logos {
  logos: Logo[];
}

export type SymbolType = string;
export type DetailsQuoteType = 'STOCK' | 'CRYPTO' | 'ETF';

/**
 * @export
 * @interface Quote
 * @extends {IncomingQuote}
 */
export interface Quote extends IncomingQuote {
  currentPrice?: number | null;
  currentPriceFormatted?: string | null;
  currentVolume?: number | null;
  lastTradeTime?: string | null;
  postToPreChange?: number | null;
  postToPrePercentChange?: number | null;
  regularHoursChange?: number | null;
  regularHoursPercentChange?: number | null;
}

/**
 * @export
 * @interface SecuritySymbol
 */
export interface SecuritySymbol {
  cik: number;
  exchange: string;
  name: string;
  symbol: string;
}

/**
 * @export
 * @interface Logo
 */
export interface Logo {
  id: string;
  search_key: string;
  files: LogoFile;
  created_at: Date;
  updated_at: Date;
}

/**
 * @export
 * @interface LogoFile
 */
export interface LogoFile {
  logo_dark: string;
  logo_light: string;
  logo_vector_dark: string;
  logo_vector_light: string;
  mark_composite_dark: string;
  mark_composite_light: string;
  mark_dark: string;
  mark_light: string;
  mark_vector_dark: string;
  mark_vector_light: string;
}

export interface DelayedQuoteSecurity {
  quote: Quote;
  security: SecuritySymbol;
}

export interface DelayedQuotesResponse {
  quotes: DelayedQuoteSecurity[];
}

/**
 * Delayed quote
 *
 * @export
 * @interface DelayedQuote
 */
export interface DelayedQuote {
  /**
   * Change
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  symbol: string;
  dxSymbol: string;
  exchange: string;
  isoExchange: string;
  bzExchange: string;
  otcMarket: string;
  otcTier: string;
  type: string;
  name: string;
  companyStandardName: string;
  description: string;
  bidPrice: number;
  askPrice: number;
  askSize: number;
  bidSize: number;
  size: number;
  bidTime: number;
  askTime: number;
  lastTradePrice: number;
  lastTradeTime: number;
  change: number;
  /**
   * Change Percent
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  changePercent: number;
  /**
   * Close
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  close: number;
  /**
   * Currency
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  currency: number;
  /**
   * Date
   *
   * @type {string}
   * @memberof DelayedQuote
   */
  date: string;
  /**
   * Fifty Two Week High
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  previousClosePrice: number;


  /**
   * Fifty day average price
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  fiftyDayAveragePrice: number;


  /**
   * Average volume
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  averageVolume: number;


  /**
   * Fifty Two Week high
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  fiftyTwoWeekHigh: number;
  /**
   * Fifty Two Week Low
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  fiftyTwoWeekLow: number;
  /**
   * High
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  high: number;
  /**
   * Last
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  last: number;
  /**
   * Low
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  low: number;
  /**
   * Open
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  open: number;
  /**
   * Previous Close
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  previousClose: number;
  /**
   * Previous Close Date
   *
   * @type {string}
   * @memberof DelayedQuote
   */
  previousCloseDate: string;
  /**
   * Trading Halted
   *
   * @type {boolean}
   * @memberof DelayedQuote
   */
  tradingHalted: boolean;
  /**
   * Volume
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  volume: number;


  /**
   * ETH price
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  ethPrice: number;


  /**
   * ETH volume
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  ethVolume: number;


  /**
   * ETH Time
   *
   * @type {number}
   * @memberof DelayedQuote
   */
  ethTime: number;


  /**
   * Issuer Name
   *
   * @type {string}
   * @memberof DelayedQuote
   */
  issuerName?: string;


  /**
   * Is primary
   *
   * @type {boolean}
   * @memberof DelayedQuote
   */
  primary: boolean;


  /**
   * Short description
   *
   * @type {string}
   * @memberof DelayedQuote
   */
  shortDescription?: string;
}

/**
 * Company ticker info
 *
 * @export
 * @interface TickerCompany
 */
export interface TickerCompany {
  exists: boolean;
  fiscalYearEnd: number;
  longDescription: string;
}

/**
 * @export
 * @interface TickerFinancialStats
 */
export interface TickerFinancialStats {
  dilutedEpsGrowth1Y: number;
  epsGrowth1Y: number;
  operationRatiosAsOf1Y: string;
  revenueGrowth1Y: number;
}

/**
 * @export
 * @interface TickerKeyStatistics
 */
export interface TickerKeyStatistics {
  /**
   * Cash And Cash Equivalents
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  cashAndCashEquivalents: number;
  /**
   * Current Debt
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  currentDebt: number;
  /**
   * Current Ratio
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  currentRatio: number;
  /**
   * Ebitda Margin
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  ebitdaMargin: number;
  /**
   * Ev To Ebitda
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  evToEbitda: number;
  /**
   * Forward Dividend Yield?
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  forwardDividendYield?: number;
  /**
   * Forward Pe Ratio
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  forwardPeRatio: number;
  /**
   * Gross Margin
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  grossMargin: number;
  /**
   * Long Term Debt
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  longTermDebt: number;
  /**
   * Pcf Ratio
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  pcfRatio: number;
  /**
   * Pe Ratio
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  peRatio: number;
  /**
   * Ps Ratio
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  psRatio: number;
  /**
   * Revenue Growth
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  revenueGrowth: number;
  /**
   * Tangible Book Value Per Share
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  tangibleBookValuePerShare: number;
  /**
   * Total Assets
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  totalAssets: number;
  /**
   * Total Debt Equity Ratio
   *
   * @type {number}
   * @memberof TickerKeyStatistics
   */
  totalDebtEquityRatio: number;
}

/**
 * @export
 * @interface TickerPeer
 */
export interface TickerPeer {
  /**
   * Peer exchange
   *
   * @type {string}
   * @memberof TickerPeer
   */
  exchange: string;

  /**
   * ISIN
   *
   * @type {string}
   * @memberof TickerPeer
   */
  isin: string;

  /**
   * Share value as a float
   *
   * @type {number}
   * @memberof TickerPeer
   */
  shareFloat?: number;

  /**
   * Shares outstanding
   *
   * @type {number}
   * @memberof TickerPeer
   */
  sharesOutstanding: number;

  /**
   * Ticker symbol
   *
   * @type {string}
   * @memberof TickerPeer
   */
  symbol: string;
}

/**
 * @export
 * @interface TickerPercentile
 */
export interface TickerPercentile {
  /**
   * Classification Standard
   *
   * @type {string}
   * @memberof TickerPercentile
   */
  classificationStandard: string;
  /**
   * Data Id
   *
   * @type {string}
   * @memberof TickerPercentile
   */
  dataId: string;
  /**
   * Data Value
   *
   * @type {number}
   * @memberof TickerPercentile
   */
  dataValue: number;
  /**
   * Group Code
   *
   * @type {number}
   * @memberof TickerPercentile
   */
  groupCode: number;
  /**
   * Group Name
   *
   * @type {string}
   * @memberof TickerPercentile
   */
  groupName: string;
  /**
   * Mean
   *
   * @type {number}
   * @memberof TickerPercentile
   */
  mean: number;
  /**
   * Median
   *
   * @type {number}
   * @memberof TickerPercentile
   */
  median: number;
  /**
   * Percentile
   *
   * @type {number}
   * @memberof TickerPercentile
   */
  percentile: number;
}

/**
 * @export
 * @interface TickerDetail
 */
export interface TickerDetail {
  /**
   * Company
   *
   * @type {TickerCompany}
   * @memberof TickerDetail
   */
  company: TickerCompany;
  /**
   * Financial Stats
   *
   * @type {TickerFinancialStats}
   * @memberof TickerDetail
   */
  financialStats: TickerFinancialStats;
  /**
   * Key Statistics
   *
   * @type {TickerKeyStatistics}
   * @memberof TickerDetail
   */
  keyStatistics: TickerKeyStatistics;
  /**
   * Peers
   *
   * @type {TickerPeer[]}
   * @memberof TickerDetail
   */
  peers: TickerPeer[];
  /**
   * Percentiles
   *
   * @type {TickerPercentile[]}
   * @memberof TickerDetail
   */
  percentiles: TickerPercentile[];
  /**
   * Share Float?
   *
   * @type {number}
   * @memberof TickerDetail
   */
  shareFloat?: number;
  /**
   * Shares Outstanding
   *
   * @type {number}
   * @memberof TickerDetail
   */
  sharesOutstanding: number;
  /**
   * Shares Short
   *
   * @type {number}
   * @memberof TickerDetail
   */
  sharesShort: number;
  /**
   * Shares Short Percent Of Float
   *
   * @type {number}
   * @memberof TickerDetail
   */
  sharesShortPercentOfFloat: number;
  /**
   * Symbol
   *
   * @type {string}
   * @memberof TickerDetail
   */
  symbol: string;
}

/**
 * @export
 * @interface TickerSession
 */
export interface TickerSession {
  /**
   * @type {number}
   * @memberof TickerSession
   */
  endTime: number;

  /**
   * @type {string}
   * @memberof TickerSession
   */
  localEndDate: string;

  /**
   *
   * @type {string}
   * @memberof TickerSession
   */
  localStartDate: string;

  /**
   *
   * @type {number}
   * @memberof TickerSession
   */
  startTime: number;

  /**
   *
   *
   * @type {string}
   * @memberof TickerSession
   */
  type: string;
}

export interface TickerDetailsResponse {
  result: TickerDetail[];
}

/**
 * @export
 * @interface Schedule
 */
export interface Schedule {
  /**
   * Day Id
   *
   * @type {number}
   * @memberof Schedule
   */
  dayId: number;
  /**
   * End Time
   *
   * @type {number}
   * @memberof Schedule
   */
  endTime: number;
  /**
   * Local Reset Date
   *
   * @type {string}
   * @memberof Schedule
   */
  localResetDate: string;
  /**
   * Reset Time
   *
   * @type {number}
   * @memberof Schedule
   */
  resetTime: number;
  /**
   * Sessions
   *
   * @type {TickerSession[]}
   * @memberof Schedule
   */
  sessions: TickerSession[];
  /**
   * Short Day
   *
   * @type {boolean}
   * @memberof Schedule
   */
  shortDay: boolean;
  /**
   * Start Time
   *
   * @type {number}
   * @memberof Schedule
   */
  startTime: number;
  /**
   * Time Zone Id
   *
   * @type {string}
   * @memberof Schedule
   */
  timeZoneId: string;
  /**
   * Trading
   *
   * @type {boolean}
   * @memberof Schedule
   */
  trading: boolean;
}

export interface ScheduleResponse {
  schedule: Schedule;
  type: QuoteSessionType;
}

/**
 * Params for short interest request
 *
 * @export
 * @interface ShortInterestParams
 */
export interface ShortInterestParams {
  /**
   * List of symbols
   *
   * @type {StockSymbol[]}
   * @memberof ShortInterestParams
   */
  symbols?: StockSymbol[];

  /**
   * Target search date
   *
   * @type {string}
   * @memberof ShortInterestParams
   */
  asOf?: string;

  /**
   * Starting date
   *
   * @type {string}
   * @memberof ShortInterestParams
   */
  dateFrom?: string;

  /**
   * Ending date
   *
   * @type {string}
   * @memberof ShortInterestParams
   */
  dateTo?: string;
}

export interface ShortInterestResponse {
  shortInterestData: ShortInterestsDataSet;
}

export interface ShortInterestsDataSet {
  [symbol: string]: ShortInterestData;
}

export interface ShortInterestData {
  data: ShortInterest[];
}

/**
 * Short interest info
 *
 * @export
 * @interface ShortInterest
 */
export interface ShortInterest {
  /**
   * Symbol
   *
   * @type {string}
   * @memberof ShortInterest
   */
  symbol: string;
  /**
   * Company
   *
   * @type {string}
   * @memberof ShortInterest
   */
  company: string;
  /**
   * Total Short Interest
   *
   * @type {string}
   * @memberof ShortInterest
   */
  totalShortInterest: string;
  /**
   * Days To Cover
   *
   * @type {number}
   * @memberof ShortInterest
   */
  daysToCover: number;
  /**
   * Short Percent Of Float?
   *
   * @type {number}
   * @memberof ShortInterest
   */
  shortPercentOfFloat?: number;
  /**
   * Performance52 Wk
   *
   * @type {number}
   * @memberof ShortInterest
   */
  performance52Wk: number;
  /**
   * Percent Insider Ownership
   *
   * @type {number}
   * @memberof ShortInterest
   */
  percentInsiderOwnership: number;
  /**
   * Percent Institutional Ownership
   *
   * @type {number}
   * @memberof ShortInterest
   */
  percentInstitutionalOwnership: number;
  /**
   * Short Prior Mo
   *
   * @type {number}
   * @memberof ShortInterest
   */
  shortPriorMo: number;
  /**
   * Percent Change Mo Mo
   *
   * @type {number}
   * @memberof ShortInterest
   */
  percentChangeMoMo: number;
  /**
   * Shares Float?
   *
   * @type {number}
   * @memberof ShortInterest
   */
  sharesFloat?: number;
  /**
   * Average Daily Volume
   *
   * @type {number}
   * @memberof ShortInterest
   */
  averageDailyVolume: number;
  /**
   * Shares Outstanding
   *
   * @type {number}
   * @memberof ShortInterest
   */
  sharesOutstanding: number;
  /**
   * Exchange
   *
   * @type {string}
   * @memberof ShortInterest
   */
  exchange: string;
  /**
   * Sector
   *
   * @type {string}
   * @memberof ShortInterest
   */
  sector: string;
  /**
   * Industry
   *
   * @type {string}
   * @memberof ShortInterest
   */
  industry: string;
  /**
   * Short Squeeze Ranking
   *
   * @type {number}
   * @memberof ShortInterest
   */
  shortSqueezeRanking: number;
}

/**
 * Request params for get logos
 *
 * @export
 * @interface GetQuotesLogoParams
 */
export interface GetQuotesLogoParams {
  /**
   * A comma (,) separated list of returned fields
   *
   * @exampleValue mark_light,background_light
   *
   * @type {string}
   * @memberof GetQuotesLogoParams
   */
  fields: string;

  /**
   * Specified as the WIDTHxHEIGHT to scale the image down in pixels.
   * Images will only be scaled down, never up, and fit within the bounds set.
   * In CSS terms, the object-fit property is set to `contain`
   * Scale will be applied to: logo_light, logo_dark, mark_light, mark_dark, mark_composite_light, mark_composite_dark
   *
   * @exampleValue 300x600
   *
   * @type {string}
   * @memberof GetQuotesLogoParams
   */
  scale: string;

  /**
   * The type of identifier being searched.
   * Supported types are currently a security symbol and CIK.
   *
   * @type {string}
   * @memberof GetQuotesLogoParams
   */
  search_keys_type: string;
}
