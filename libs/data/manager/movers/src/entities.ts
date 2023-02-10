export interface MoversResponse {
  result: Movers;
}

/**
 * Movers entity
 *
 * @export
 * @interface Movers
 */
export interface Movers {
  /**
   * List of gainers
   *
   * @type {Mover[]}
   * @memberof Movers
   */
  gainers: Mover[];

  /**
   * Lits of losers
   *
   * @type {Mover[]}
   * @memberof Movers
   */
  losers: Mover[];

  /**
   * All movers that fulfilled the  (gainers and losers)
   *
   * @type {Mover[]}
   * @memberof Movers
   */
  all: Mover[];

  /**
   * Datetime of the start of the period used to calculate movers.
   *
   * @type {string}
   * @memberof Movers
   */
  fromDate: string;

  /**
   * Datetime of the end of the period used to calculate movers.
   *
   * @type {string}
   * @memberof Movers
   */
  toDate: string;
  snapTo: string;

  /**
   * True if the previous regular session close is being used to calculated price change fields.
   *
   * @type {boolean}
   * @memberof Movers
   */
  usePreviousClose: boolean;
}

/**
 * Single mover entity
 *
 * @export
 * @interface Mover
 */
export interface Mover {
  /**
   * Ticker Symbol (F, MSFT, etc...)
   *
   * @type {string}
   * @memberof Mover
   */
  symbol: string;

  /**
   * Price change
   *
   * @type {number}
   * @memberof Mover
   */
  change: number;

  /**
   * Price change percent
   *
   * @type {number}
   * @memberof Mover
   */
  changePercent: number;

  /**
   * Volume for the instrument over the report period.
   *
   * @type {number}
   * @memberof Mover
   */
  volume: number;

  /**
   * The last known price (up to a minute delayed if in an active session) of the instrument.
   *
   * @type {number}
   * @memberof Mover
   */
  close: number;

  /**
   * Company name
   *
   * @type {string}
   * @memberof Mover
   */
  companyName: string;

  /**
   * Average 50 date volume for the instrument
   *
   * @type {number}
   * @memberof Mover
   */
  averageVolume?: number;

  /**
   * Previous close price
   *
   * @type {number}
   * @memberof Mover
   */
  previousClose: number;

  /**
   * Market cap
   *
   * @type {string}
   * @memberof Mover
   */
  marketCap?: string;

  /**
   * GICS Sector name
   *
   * @type {string}
   * @memberof Mover
   */
  gicsSectorName?: string;
}

/**
 * Filters movers by screener query.
 * A screener query is a set of conditions.
 *
 * @example
 * {
 *  previousClose_lt: 500,
 *  previousClose_gt: 100
 * }
 *
 * Will filter movers with previousClose value in range (100,500)
 *
 * @export
 * @interface MoversScreenerQuery
 */
export interface MoversScreenerQuery {
  previousClose_lt?: number;
  previousClose_gt?: number;
  marketCap_lt?: number;
  marketCap_gt?: number;
  volume_lt?: number;
  volume_gt?: number;
  symbol_in?: string[];
  sector_in?: string[];
  industry_in?: string[];
}

export type MoversQuerySessionType = 'REGULAR' | 'PRE_MARKET' | 'AFTER_MARKET';

export interface MoversQuery {
  /**
   * From session or timestamp.
   *
   * Accepted formats: yyyy-mm-dd, yyyy-mm-ddThh:mm:ii:ss or relative (1d, -1w, -1y, YTD)
   *
   * @type {string}
   * @memberof MoversQuery
   */
  from?: string;

  /**
   * To session or timestamp
   *
   * Accepted formats: yyyy-mm-dd, yyyy-mm-ddThh:mm:ii:ss
   *
   * @type {string}
   * @memberof MoversQuery
   */
  to?: string;

  /**
   * The market session to report for.
   * PRE_MARKET and AFTER_MARKET will return movers only for the one session.
   * Multi-day movers always use official regular session closing prices. REGULAR is default.
   *
   * @defaultValue REGULAR
   *
   * @type {string}
   * @memberof MoversQuery
   */
  session?: MoversQuerySessionType;

  /**
   * Max numbers of gainers/losers to return. Limit 1000.
   *
   * @type {number}
   * @memberof MoversQuery
   */
  maxResults?: number;

  /**
   * Screener query for request
   * Filters movers by screener query.
   *
   * If string supplied, a screener query is a list of conditions separated by a semicolon, like 'marketcap_gt_1b
   *
   * @type {(MoversScreenerQuery | string)}
   * @memberof MoversQuery
   */
  screenerQuery?: MoversScreenerQuery | string;
}
