import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar split record
 *
 * @export
 * @interface Split
 * @extends {CommonCalendarEventEntity<'split'>}
 */
export interface Split extends CommonCalendarEventEntity<'split'> {
  /**
   * Announced Date on calendar (formerly labeled as date in our docs).
   *
   * @type {string}
   * @memberof Split
   */
  date_announced: string;

  /**
   * Ticker Symbol (F, MSFT, etc...)
   *
   * @type {string}
   * @memberof Split
   */
  ticker: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Split
   */
  exchange: string;

  /**
   * Ratio of the split (x:y)
   *
   * @type {string}
   * @memberof Split
   */
  ratio: string;

  /**
   * Is the script optionable?
   *
   * @type {boolean}
   * @memberof Split
   */
  optionable: boolean;

  /**
   * Ex date
   *
   * @type {string}
   * @memberof Split
   */
  date_ex?: string;

  /**
   * Recorded date
   *
   * @type {string}
   * @memberof Split
   */
  date_recorded?: string;

  /**
   * Distribution date
   *
   * @type {string}
   * @memberof Split
   */
  date_distribution?: string;
}
