import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Earning
 *
 * @export
 * @interface Earning
 * @extends {CommonCalendarEventEntity<'earning'>}
 */
export interface Earning extends CommonCalendarEventEntity<'earning'> {
  /**
   * Announced Date on Calendar
   *
   * @type {string}
   * @memberof Earning
   */
  date?: string;

  /**
   * If the report date was confirmed (vs est)
   *
   * @type {string}
   * @memberof Earning
   */
  date_confirmed: string;

  /**
   * Announced Time on Calendar, 24hr format
   *
   * @type {string}
   * @memberof Earning
   */
  time: string;

  /**
   * Ticker Symbol (F, MSFT, etc...)
   *
   * @type {string}
   * @memberof Earning
   */
  ticker: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Earning
   */
  exchange: string;

  /**
   * Name of security
   *
   * @type {string}
   * @memberof Earning
   */
  name: string;

  /**
   * Currency the data is denominated in
   *
   * @type {string}
   * @memberof Earning
   */
  currency: string;

  /**
   * Period of the earnings actual
   *
   * @type {string}
   * @memberof Earning
   */
  period?: string;

  /**
   * Period Year of the earnings actual
   *
   * @type {number}
   * @memberof Earning
   */
  period_year: number;

  /**
   * EPS Type
   *
   * @type {string}
   * @memberof Earning
   */
  eps_type: string;

  /**
   * Comparable and Adjusted Earnings Per Share
   *
   * @type {string}
   * @memberof Earning
   */
  eps?: string;

  /**
   * Adjusted EPS Consensus Aggregate Analyst Estimate
   *
   * @type {string}
   * @memberof Earning
   */
  eps_est?: string;

  /**
   * Adjusted EPS from Prior Period
   *
   * @type {string}
   * @memberof Earning
   */
  eps_prior?: string;

  /**
   * EPS deviation from estimate
   *
   * @type {string}
   * @memberof Earning
   */
  eps_surprise?: string;

  /**
   * Deviation from estimate as percentage
   *
   * @type {string}
   * @memberof Earning
   */
  eps_surprise_percent?: string;

  /**
   * Revenue Type
   *
   * @type {string}
   * @memberof Earning
   */
  revenue_type?: string;

  /**
   * Revenue
   *
   * @type {string}
   * @memberof Earning
   */
  revenue?: string;

  /**
   * Revenue estimate
   *
   * @type {string}
   * @memberof Earning
   */
  revenue_est?: string;

  /**
   * Revenue value for previous period
   *
   * @type {string}
   * @memberof Earning
   */
  revenue_prior?: string;

  /**
   * Revenue deviation from estimate
   *
   * @type {string}
   * @memberof Earning
   */
  revenue_surprise?: string;

  /**
   * Deviation from estimate as percentage
   *
   * @type {string}
   * @memberof Earning
   */
  revenue_surprise_percent?: string;

  /**
   * Additional notes provided by the Benzinga Newsdesk where applicable.
   * Notes may include HTML.
   *
   * @type {string}
   * @memberof Earning
   */
  notes?: string;
}
