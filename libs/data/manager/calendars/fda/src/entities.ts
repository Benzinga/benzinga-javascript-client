import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

export type FdaSearchField = 'announced' | 'target';
export type FdaEventType = 'clinical_trial' | 'approval_foreign' | 'pdufa_date';

export type FdaOutcomeBrief =
  | 'Planned to Submit'
  | 'Filing Accepted'
  | 'Updated Application'
  | 'Planned Meeting'
  | 'Announced Clearance to Study'
  | 'Concluded Enrollment'
  | 'Initiated Study'
  | 'Study Progressed'
  | 'Concluded Study'
  | 'Temporarily Suspended'
  | 'Approved to Commence'
  | 'Decision Deferred'
  | 'Provided Update'
  | 'Data Release Scheduled'
  | 'Published Results'
  | 'Received Use Authorization';

export type FdaSourceType = 'Press Release' | 'FDA Website' | 'Other';

/**
 * FDA Company security
 *
 * @export
 * @interface FdaCompanySecurity
 */
export interface FdaCompanySecurity {
  exchange: string;
  symbol: string;
}

/**
 * FDA Company
 *
 * @export
 * @interface FdaCompany
 */
export interface FdaCompany {
  id: string;
  name: string;
  cik: string;
  securities: FdaCompanySecurity[];
}

/**
 * FDA Drug info
 *
 * @export
 * @interface FdaDrug
 */
export interface FdaDrug {
  id: string;

  name: string;

  indication_symptom: string;

  generic: boolean;
}

/**
 * Calendar FDA record
 *
 * @export
 * @interface Fda
 * @extends {CommonCalendarEventEntity<'fda'>}
 */
export interface Fda extends CommonCalendarEventEntity<'fda'> {
  /**
   * Specifies which type of event the row represents.
   *
   * @type {FdaEventType}
   * @memberof Fda
   */
  event_type: FdaEventType;

  /**
   * Date on which Benzinga received the information
   *
   * @type {string}
   * @memberof Fda
   */
  date?: string;

  /**
   * Time at which Benzinga received the information
   *
   * @type {string}
   * @memberof Fda
   */
  time: string;

  /**
   * Companies developing the drug
   *
   * @type {FdaCompany[]}
   * @memberof Fda
   */
  companies: FdaCompany[];

  drug: FdaDrug;

  /**
   * The announced status of the drug
   *
   * @type {string}
   * @memberof Fda
   */
  status: string;

  /**
   * The US National Library of Medicine's individual identifier for each clinical trial
   *
   * @type {string}
   * @memberof Fda
   */
  nic_number: string;

  /**
   * The announced target date
   *
   * Format: YYYY-MM-DD, YYYY-MM, YYYY-Q[1-4], YYYY-H[1-2], or YYYY-[EARLY, MID, LATE]
   *
   * @type {string}
   * @memberof Fda
   */
  target_date: string;

  /**
   * The significance/outcome of the announcement, categorized
   *
   * @type {FdaOutcomeBrief}
   * @memberof Fda
   */
  outcome_brief: FdaOutcomeBrief;

  /**
   * The significance/outcome of the announcement
   *
   * @type {string}
   * @memberof Fda
   */
  outcome: string;

  /**
   * Additional information beyond the few-sentence outcome
   *
   * @type {string}
   * @memberof Fda
   */
  commentary: string;

  /**
   * The type of source from which this data was obtained
   *
   * @type {FdaSourceType}
   * @memberof Fda
   */
  source_type: FdaSourceType;

  /**
   * The URL of the source
   *
   * @type {string}
   * @memberof Fda
   */
  source_link: string;

  /**
   * Additional notes provided by the Benzinga Newsdesk where applicable. Notes may include HTML.
   *
   * @type {string}
   * @memberof Fda
   */
  notes?: string;

  /**
   * Object creation Unix timestamp, UTC
   *
   * @type {number}
   * @memberof Fda
   */
  created: number;
}
