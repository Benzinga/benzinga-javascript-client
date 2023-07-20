import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar economics record
 *
 * @export
 * @interface Economics
 * @extends {CommonCalendarEventEntity<'economics'>}
 */
export interface Economics extends CommonCalendarEventEntity<'economics'> {
  date?: string;
  time?: string;

  /**
   * 3-Character Country Code (USA, CAN, etc...)
   *
   * @type {string}
   * @memberof Economics
   */
  country: string;

  /**
   * Economic Event
   *
   * @type {string}
   * @memberof Economics
   */
  event_name?: string;

  /**
   * Period of Time (Q1, September, Third Week of August,...)
   *
   * @type {string}
   * @memberof Economics
   */
  event_period?: string;

  /**
   * Period Year
   *
   * @type {number}
   * @memberof Economics
   */
  period_year?: number;

  /**
   * Value of economic indicator
   *
   * @type {string}
   * @memberof Economics
   */
  actual?: string;

  /**
   * Unit for actual field
   *
   * @type {string}
   * @memberof Economics
   */
  actual_t?: string;

  /**
   * Estimate for actual field
   *
   * @type {string}
   * @memberof Economics
   */
  consensus?: string;

  /**
   * Unit for consensus field
   *
   * @type {string}
   * @memberof Economics
   */
  consensus_t?: string;

  /**
   * Value of actual field for previous period
   *
   * @type {string}
   * @memberof Economics
   */
  prior?: string;

  /**
   * Unit for prior field
   *
   * @type {string}
   * @memberof Economics
   */
  prior_t?: string;

  /**
   * Subjective basis of how important event is to market. 5 = High
   *
   * @type {number}
   * @memberof Economics
   */
  importance?: number;

  /**
   * Event Description
   *
   * @type {string}
   * @memberof Economics
   */
  description?: string;
}
