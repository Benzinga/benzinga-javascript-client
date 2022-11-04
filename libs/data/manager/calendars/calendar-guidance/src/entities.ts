import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

export type GuidancePrimaryFlag = 'Y' | 'N' | 'All';
export type GuidancePreliminaryFlag = 'Y' | 'N';
export type GuidancePeriod = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY';
export type GuidanceEpsType = 'Adj' | 'GAAP' | 'FFO';

/**
 * Calendar guidance record
 *
 * @export
 * @interface Guidance
 * @extends {CommonCalendarEventEntity<'guidance'>}
 */
export interface Guidance extends CommonCalendarEventEntity<'guidance'> {
  /**
   * Announced Date on Calendar
   *
   * @type {string}
   * @memberof Guidance
   */
  date?: string;

  /**
   * Announced Time on Calendar, 24hr format
   *
   * @type {string}
   * @memberof Guidance
   */
  time?: string;

  /**
   * Exchange (NYSE, NASDAQ, etc...)
   *
   * @type {string}
   * @memberof Guidance
   */
  exchange: string;

  /**
   * Currency the data is denominated in
   *
   * @type {string}
   * @memberof Guidance
   */
  currency: string;

  /**
   * Period within-year of the guidance
   *
   * @type {GuidancePeriod}
   * @memberof Guidance
   */
  period: GuidancePeriod;

  /**
   * Period year of the guidance
   *
   * @type {number}
   * @memberof Guidance
   */
  period_year: number;

  /**
   * Yes or No for if guidance is a preliminary earnings report
   *
   * @type {GuidancePreliminaryFlag}
   * @memberof Guidance
   */
  prelim: GuidancePreliminaryFlag;

  /**
   * Specifies type of guidance returned - primary, secondary or all
   *
   * @type {GuidancePrimaryFlag}
   * @memberof Guidance
   */
  is_primary: GuidancePrimaryFlag;

  /**
   * Reported EPS Type can be Adjusted, GAAP or FFO. FFO is only used for REITs.
   *
   * @type {GuidanceEpsType}
   * @memberof Guidance
   */
  eps_type: GuidanceEpsType;

  /**
   * Adjusted EPS Consensus Estimate
   *
   * @type {string}
   * @memberof Guidance
   */
  eps_guidance_est?: string;

  /**
   * Adjusted EPS from Prior Period Max
   *
   * @type {string}
   * @memberof Guidance
   */
  eps_guidance_max?: string;

  /**
   * Adjusted EPS from Prior Period Min
   *
   * @type {string}
   * @memberof Guidance
   */
  eps_guidance_min?: string;

  /**
   * Adjusted EPS from Prior Period Max
   *
   * @type {string}
   * @memberof Guidance
   */
  eps_guidance_prior_max?: string;

  /**
   * Adjusted EPS from Prior Period Min
   *
   * @type {string}
   * @memberof Guidance
   */
  eps_guidance_prior_min?: string;

  /**
   * Revenue guidance estimate
   *
   * @type {string}
   * @memberof Guidance
   */
  revenue_guidance_est?: string;

  /**
   * Revenue guidance max
   *
   * @type {string}
   * @memberof Guidance
   */
  revenue_guidance_max?: string;

  /**
   * Revenue guidance min
   *
   * @type {string}
   * @memberof Guidance
   */
  revenue_guidance_min?: string;

  /**
   * Revenue guidance max from previous period
   *
   * @type {string}
   * @memberof Guidance
   */
  revenue_guidance_prior_max?: string;

  /**
   * Revenue guidance min from previous period
   *
   * @type {string}
   * @memberof Guidance
   */
  revenue_guidance_prior_min?: string;

  /**
   * Revenue Type
   *
   * @type {GuidanceEpsType}
   * @memberof Guidance
   */
  revenue_type: GuidanceEpsType;

  /**
   * Additional notes provided by the Benzinga Newsdesk where applicable. Notes may include HTML.
   *
   * @type {string}
   * @memberof Guidance
   */
  notes?: string;
}
