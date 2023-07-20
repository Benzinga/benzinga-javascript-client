import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar retail record
 *
 * @export
 * @interface Retail
 * @extends {CommonCalendarEventEntity<'retail'>}
 */
export interface Retail extends CommonCalendarEventEntity<'retail'> {
  /**
   * Date for sales announcement
   *
   * @type {string}
   * @memberof Retail
   */
  date: string;

  /**
   * Time for sales announcement
   *
   * @type {string}
   * @memberof Retail
   */
  time: string;

  /**
   * Name of exchange where security is listed
   *
   * @type {string}
   * @memberof Retail
   */
  exchange: string;

  /**
   * Currency the data is denominated in
   *
   * @type {string}
   * @memberof Retail
   */
  currency: string;

  /**
   * Period of the retail sales
   *
   * @exampleValue Q1 , Q2 , Q3 , Q4 , FY , Jan , Feb , Mar , Apr , May , Jun , Jul , Aug , Sep , Oct , Nov , Dec
   *
   * @type {string}
   * @memberof Retail
   */
  period: string;

  /**
   * Year for the period of the retail sales
   *
   * @type {number}
   * @memberof Retail
   */
  period_year: number;

  /**
   * Same-Store Sales
   *
   * @type {string}
   * @memberof Retail
   */
  sss: string;

  /**
   * Same-Store Sales estimate
   *
   * @type {string}
   * @memberof Retail
   */
  sss_est?: string;

  /**
   * Deviation from estimate
   *
   * @type {string}
   * @memberof Retail
   */
  retail_surprise?: string;
}
