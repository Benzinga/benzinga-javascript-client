import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar Offering record
 *
 * @export
 * @interface Offering
 * @extends {CommonCalendarEventEntity<'offering'>}
 */
export interface Offering extends CommonCalendarEventEntity<'offering'> {
  date: string;
  time: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Offering
   */
  exchange: string;

  /**
   * The currency of the offering
   *
   * @type {string}
   * @memberof Offering
   */
  currency: string;

  /**
   * If the offer is a Shelf.
    True if securities are sold in portion over a longer period.
    False if securities are sold at the initial date of offering.
   *
   * @type {boolean}
   * @memberof Offering
   */
  shelf: boolean;

  /**
   * The offering price
   *
   * @type {string}
   * @memberof Offering
   */
  price: string;

  /**
   * The total value of the offering
   *
   * @type {string}
   * @memberof Offering
   */
  proceeds: string;

  /**
   * The number of shares in the offering
   *
   * @type {number}
   * @memberof Offering
   */
  number_shares: number;

  /**
   * Benzinga assigned score for how important the event is
   *
   * @type {number}
   * @memberof Offering
   */
  importance: number;
}
