import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar conference call record
 *
 * @export
 * @interface Conference
 * @extends {CommonCalendarEventEntity<'conference'>}
 */
export interface Conference extends CommonCalendarEventEntity<'conference'> {
  /**
   * Access code for conference call if available
   *
   * @type {string}
   * @memberof Conference
   */
  access_code: string;

  /**
   * Announced Date on Calendar
   *
   * @type {string}
   * @memberof Conference
   */
  date: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Conference
   */
  exchange: string;

  /**
   * Subjective Basis of How Important Event is to Market. 5 = High
   *
   * @type {string}
   * @memberof Conference
   */
  importance: string;

  /**
   * International number to call if outside USA
   *
   * @type {string}
   * @memberof Conference
   */
  international_num: string;

  /**
   * Phone number of conference call
   *
   * @type {string}
   * @memberof Conference
   */
  phone_num: string;

  /**
   * Reservation number for conference call if avaliable
   *
   * @type {string}
   * @memberof Conference
   */
  reservation_num: string;

  /**
   * Time of earnings conference call, in local time
   *
   * @type {string}
   * @memberof Conference
   */
  start_time: string;

  /**
   * Announced Time on Calendar
   *
   * @type {string}
   * @memberof Conference
   */
  time: string;

  /**
   * Last updated timestamp, UTC
   *
   * @type {number}
   * @memberof Conference
   */
  updated: number;

  /**
   * URL of webcast for conference call if avaliable
   *
   * @type {string}
   * @memberof Conference
   */
  website_url: string;
}
