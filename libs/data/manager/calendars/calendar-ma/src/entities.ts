import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

export type MaDealType = 'Acquisition' | 'Merger' | 'Asset Sale';
export type MaDealPaymentType = 'Cash' | 'Stock' | 'Cash & Stock';
export type MaDealStatus = 'Rumored' | 'Announced' | 'Regulatory Review' | 'Completed' | 'Canceled';

/**
 * Calendar Mergers and Acquisitions record
 *
 * @export
 * @interface MergersAndAcquisitions
 * @extends {CommonCalendarEventEntity<'ma'>}
 */
export interface MergersAndAcquisitions extends CommonCalendarEventEntity<'ma'> {
  /**
   * Date of deal announcment
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  date: string;

  /**
   * Date deal is expected to complete
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  date_expected?: string;

  /**
   * Date of deal completion
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  date_completed?: string;

  /**
   * Ticker symbol of acquiring company
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  acquirer_ticker: string;

  /**
   * Exchange for the acquirer ticker
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  acquirer_exchange: string;

  /**
   * Name of acquiring company
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  acquirer_name: string;

  /**
   * Ticker symbol of target company
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  target_ticker: string;

  /**
   * Exchange for the target ticker
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  target_exchange: string;

  /**
   * Name of the target company
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  target_name: string;

  /**
   * Currency the data is denominated in
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  currency: string;

  /**
   * Type of deal
   *
   * @type {MaDealType}
   * @memberof MergersAndAcquisitions
   */
  deal_type: MaDealType;

  /**
   * Aggregate deal value
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  deal_size: string;

  /**
   * Deal payment type
   *
   * @type {MaDealPaymentType}
   * @memberof MergersAndAcquisitions
   */
  deal_payment_type: MaDealPaymentType;

  /**
   * Deal status
   *
   * @type {MaDealStatus}
   * @memberof MergersAndAcquisitions
   */
  deal_status: MaDealStatus;

  /**
   * Any additional relevant terms
   *
   * @type {string}
   * @memberof MergersAndAcquisitions
   */
  deal_terms_extra?: string;
}
