import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar dividend record
 *
 * @export
 * @interface Dividend
 * @extends {CommonCalendarEventEntity<'dividend'>}
 */
export interface Dividend extends CommonCalendarEventEntity<'dividend'> {
  /**
   * Announced Date on calendar
   *
   * @type {string}
   * @memberof Dividend
   */
  date: string;

  /**
   * Additional notes provided by the Benzinga Newsdesk where applicable.
   * Notes may include HTML.
   *
   * @type {string}
   * @memberof Dividend
   */
  notes?: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Dividend
   */
  exchange: string;

  /**
   * Frequency of the dividend
   *
   * @type {number}
   * @memberof Dividend
   */
  frequency: number;

  /**
   * Currency the data is denominated in
   *
   * @type {string}
   * @memberof Dividend
   */
  currency: string;

  /**
   * Dividend value. Expected value is a double if set or empty if null.
   *
   * @type {string}
   * @memberof Dividend
   */
  dividend?: string;

  /**
   * Period prior dividend value. Expected value is a double if set or empty if null.
   *
   * @type {string}
   * @memberof Dividend
   */
  dividend_prior?: string;

  /**
   * Type of dividend
   *
   * @type {string}
   * @memberof Dividend
   */
  dividend_type: string;

  /**
   * Yield of dividend. Expected value is a double if set or empty if null.
   *
   * @type {string}
   * @memberof Dividend
   */
  dividend_yield?: string;

  /**
   * Dividend Ex Date
   *
   * @type {string}
   * @memberof Dividend
   */
  ex_dividend_date?: string;

  /**
   * Dividend Payable Date
   *
   * @type {string}
   * @memberof Dividend
   */
  payable_date?: string;

  /**
   * Dividend Recorded Date
   *
   * @type {string}
   * @memberof Dividend
   */
  record_date?: string;

  /**
   * Subjective basis of how important event is to market. 5 = high
   *
   * @type {number}
   * @memberof Dividend
   */
  importance?: number;
}
