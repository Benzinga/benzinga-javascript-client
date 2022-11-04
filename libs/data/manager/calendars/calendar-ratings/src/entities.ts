import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

export type RatingsActionType = 'Announces' | 'Maintains' | 'Lowers' | 'Raises' | 'Removes';

export type RatingsActionCompany =
  | 'Downgrades'
  | 'Maintains'
  | 'Reinstates'
  | 'Reiterates'
  | 'Upgrades'
  | 'Assumes'
  | 'Initiates Coverage On'
  | 'Terminates Coverage On'
  | 'Removes'
  | 'Suspends'
  | 'Firm Dissolved';

export interface IApiRatingsAccuracy {
  smart_score: string;
  overall_success_rate: string;
  overall_avg_return_percentile: string;
  total_ratings_percentile: string;
  total_ratings: number;
  overall_gain_count: number;
  overall_loss_count: number;
  overall_average_return: string;
  overall_stdev: string;
  '1m_gain_count': string;
  '1m_loss_count': string;
  '1m_average_return': string;
  '1m_stdev': string;
  '3m_gain_count': string;
  '3m_loss_count': string;
  '3m_average_return': string;
  '3m_stdev': string;
  '9m_gain_count': string;
  '9m_loss_count': string;
  '9m_average_return': string;
  '9m_stdev': string;
  '1y_gain_count': string;
  '1y_loss_count': string;
  '1y_average_return': string;
  '1y_stdev': string;
  '2y_gain_count': string;
  '2y_loss_count': string;
  '2y_average_return': string;
  '2y_stdev': string;
  '3y_gain_count': string;
  '3y_loss_count': string;
  '3y_average_return': string;
  '3y_stdev': string;
  updated: number;
}

/**
 * Calendar rating record
 *
 * @export
 * @interface Rating
 * @extends {CommonCalendarEventEntity<'rating'>}
 */
export interface Rating extends CommonCalendarEventEntity<'rating'> {
  /**
   * Unique ID of this entry
   *
   * @type {string}
   * @memberof Rating
   */
  id: string;

  /**
   * Date for rating
   *
   * @type {Date}
   * @memberof Rating
   */
  date?: Date;

  /**
   * Time for rating
   *
   * @type {string}
   * @memberof Rating
   */
  time: string;

  /**
   * Ticker symbol of company that is subject of rating
   *
   * @type {string}
   * @memberof Rating
   */
  ticker: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Rating
   */
  exchange: string;

  /**
   * Name of company that is subject of rating
   *
   * @type {string}
   * @memberof Rating
   */
  name: string;

  /**
   * Currency the data is denominated in
   *
   * @type {string}
   * @memberof Rating
   */
  currency: string;

  /**
   * Description of the change in price target from firm's last price target
   *
   * @type {RatingsActionCompany}
   * @memberof Rating
   */
  actionPt: RatingsActionType;

  /**
   * Description of the change in rating from firm's last rating.
   * Note that all of these terms are precisely defined.
   *
   * @type {RatingsActionCompany}
   * @memberof Rating
   */
  actionCompany: RatingsActionCompany;

  /**
   * The analyst's rating for the company
   *
   * @type {string}
   * @memberof Rating
   */
  ratingCurrent: string;

  /**
   * Analyst's current price target
   *
   * @type {string}
   * @memberof Rating
   */
  ptCurrent: string;

  /**
   * Prior analyst rating for the company
   *
   * @type {string}
   * @memberof Rating
   */
  ratingPrior: string;

  /**
   * Analyst's prior price target
   *
   * @type {string}
   * @memberof Rating
   */
  ptPrior: string;

  /**
   * URL for analyst ratings page for this ticker on Benzinga.com
   *
   * @type {string}
   * @memberof Rating
   */
  url: string;

  /**
   * URL for analyst ratings page for this ticker on Benzinga.com
   *
   * @type {string}
   * @memberof Rating
   */
  urlCalendar: string;

  /**
   * URL for analyst ratings news articles for this ticker on Benzinga.com
   *
   * @type {string}
   * @memberof Rating
   */
  urlNews: string;

  /**
   * Name of the analyst firm that published the rating
   *
   * @type {string}
   * @memberof Rating
   */
  analyst: string;

  /**
   * Id of the analyst
   *
   * @type {string}
   * @memberof Rating
   */
  analystId: string;

  /**
   * Name of the analyst (person) that published the rating
   *
   * @type {string}
   * @memberof Rating
   */
  analystName: string;

  /**
   * Analyst accuracy scores
   *
   * @type {IApiRatingsAccuracy}
   * @memberof Rating
   */
  ratingsAccuracy: IApiRatingsAccuracy;
}
