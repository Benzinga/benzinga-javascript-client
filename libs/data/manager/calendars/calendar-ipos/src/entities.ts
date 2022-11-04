import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

export type IpoDealStatus = 'Rumored' | 'Initial Filing' | 'Amended' | 'Priced' | 'Closed' | 'Postponed' | 'Withdrawn';

export type IpoType =
  | 'Ordinary Shares'
  | 'Depository Receipt'
  | 'Unit'
  | 'SPAC Unit'
  | 'SPAC'
  | 'MandA'
  | 'Direct Listing';

/**
 * Calendar IPO record
 *
 * @export
 * @interface Ipo
 * @extends {CommonCalendarEventEntity<'ipo'>}
 */
export interface Ipo extends CommonCalendarEventEntity<'ipo'> {
  /**
   * Expected (Actual) IPO Open Date
   *
   * @type {string}
   * @memberof Ipo
   */
  date: string;

  /**
   * Time of row entry
   *
   * @type {string}
   * @memberof Ipo
   */
  time: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Ipo
   */
  exchange: string;

  /**
   * Is the IPO open date verified?
   *
   * @type {boolean}
   * @memberof Ipo
   */
  open_date_verified: boolean;

  /**
   * Date of IPO pricing
   *
   * @type {string}
   * @memberof Ipo
   */
  pricing_date: string;

  /**
   * Currency the data is denominated in
   *
   * @type {string}
   * @memberof Ipo
   */
  currency: string;

  /**
   * Minimum open price
   *
   * @type {string}
   * @memberof Ipo
   */
  price_min: string;

  /**
   * Maximum open price
   *
   * @type {string}
   * @memberof Ipo
   */
  price_max: string;

  /**
   * Price at which the company sells its shares to investors during an IPO
   *
   * @type {string}
   * @memberof Ipo
   */
  price_public_offering: string;

  /**
   * Price at open
   *
   * @type {string}
   * @memberof Ipo
   */
  price_open: string;

  /**
   * IPO Status
   *
   * @type {IpoDealStatus}
   * @memberof Ipo
   */
  deal_status: IpoDealStatus;

  /**
   * Type of IPO
   *
   * @type {IpoType}
   * @memberof Ipo
   */
  ipo_type: IpoType;

  /**
   * Insider lockup period in days
   *
   * @type {number}
   * @memberof Ipo
   */
  insider_lockup_days: number;

  /**
   * Insider lockup date
   *
   * @type {string}
   * @memberof Ipo
   */
  insider_lockup_date: string;

  /**
   * Value of IPO (offering_shares multiplied by the public offering price)
   *
   * @type {number}
   * @memberof Ipo
   */
  offering_value: number;

  /**
   * Number of shares offered in IPO
   *
   * @type {number}
   * @memberof Ipo
   */
  offering_shares: number;

  /**
   *
   * Temporarily unavailable.
   * If pre-IPO shares outstanding is an important data field for you, please let us know.
   *
   * @internal
   *
   * @type {number}
   * @memberof Ipo
   */
  shares_outstanding?: number;

  /**
   * List of lead underwriter(s)
   *
   * @type {string[]}
   * @memberof Ipo
   */
  lead_underwriters: string[];

  /**
   * List of other/secondary underwriter(s)
   *
   * @type {string[]}
   * @memberof Ipo
   */
  other_underwriters: string[];

  /**
   * Underwriter quite expiration period in days
   *
   * @type {number}
   * @memberof Ipo
   */
  underwriter_quiet_expiration_days: number;

  /**
   * Underwriter quite expiration date
   *
   * @type {string}
   * @memberof Ipo
   */
  underwriter_quiet_expiration_date: string;

  /**
   * Additional notes provided by the Benzinga Newsdesk where applicable. Notes may include HTML.
   *
   * @type {string}
   * @memberof Ipo
   */
  notes?: string;
}
