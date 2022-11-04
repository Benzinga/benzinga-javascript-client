/**
 * WIIM security
 *
 * @export
 * @interface WiimSecurity
 */
export interface WiimSecurity {
  /**
   * The listed exchange
   *
   * @type {string}
   * @memberof WiimSecurity
   */
  exchange: string;

  /**
   * The security symbol
   *
   * @type {string}
   * @memberof WiimSecurity
   */
  symbol: string;

  /**
   * The name of the security
   *
   * @type {string}
   * @memberof WiimSecurity
   */
  name: string;

  /**
   * The country of the security
   *
   * @type {string}
   * @memberof WiimSecurity
   */
  country: string;

  /**
   * CUSIP, available for licenced customers
   *
   * @type {string}
   * @memberof WiimSecurity
   */
  cusip: string;

  /**
   * ISIN, available for licenced customers
   *
   * @type {string}
   * @memberof WiimSecurity
   */
  isin: string;
}

/**
 * WIIM Entity
 *
 * @export
 * @interface Wiim
 */
export interface Wiim {
  /**
   * Unique ID of this signal shared across all signal types
   *
   * @type {string}
   * @memberof Wiim
   */
  id: string;

  /**
   * The listed WIIMs for the security
   *
   * @type {string}
   * @memberof Wiim
   */
  description?: string;

  /**
   * Searched key, if active WIIMs
   *
   * @type {string}
   * @memberof Wiim
   */
  searchKey?: string;

  /**
   * Security
   *
   * @type {WiimSecurity}
   * @memberof Wiim
   */
  security: WiimSecurity;

  /**
   * Created timestamp, UTC.
   *
   * @type {number}
   * @memberof Wiim
   */
  created: number;

  /**
   * Last updated timestamp, UTC.
   *
   * @type {number}
   * @memberof Wiim
   */
  updated: number;

  /**
   * The timestamp, UTC, in which the WIIMs expires and is no longer considered active.
   *
   * @type {number}
   * @memberof Wiim
   */
  expired: number;
}
