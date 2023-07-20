import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar options activity record
 *
 * @export
 * @interface OptionsActivity
 * @extends {CommonCalendarEventEntity<'options_activity'>}
 */
export interface OptionsActivity extends CommonCalendarEventEntity<'options_activity'> {
  aggressor_ind: string;
  ask: string;
  bid: string;
  cost_basis: string;
  date: string;
  date_expiration: string;
  description: string;
  description_extended: string;
  exchange: string;
  execution_estimate: string;
  midpoint: string;
  open_interest: string;
  option_activity_type: string;
  option_symbol: string;
  price: string;
  put_call: string;
  sentiment: string;
  size: string;
  strike_price: string;
  time: string;
  trade_count: string;
  underlying_price: string;
  underlying_type: string;
  volume: string;
}
