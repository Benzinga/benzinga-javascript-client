import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar options activity record
 *
 * @export
 * @interface OptionsActivity
 * @extends {CommonCalendarEventEntity<'options_activity'>}
 */
export interface OptionsActivity extends CommonCalendarEventEntity<'options_activity'> {
  acquirer_exchange: string;
  acquirer_name: string;
  acquirer_ticker: string;
  currency: string;

  /**
   * The date the signal was created
   *
   * @type {string}
   * @memberof OptionsActivity
   */
  date: string;
  date_completed: Date;
  date_expected: Date;
  deal_payment_type: string;
  deal_size: string;
  deal_status: string;
  deal_terms_extra?: string;
  deal_type: string;
  importance?: 0 | 1 | 2 | 3 | 4 | 5;
  target_exchange: string;
  target_name: string;
  target_ticker: string;

  /**
   * Price of the underlying security. Field is available based on vendor and exchange agreement.
   *
   * @type {number}
   * @memberof OptionsActivity
   */
  underlying_price: number;
}
