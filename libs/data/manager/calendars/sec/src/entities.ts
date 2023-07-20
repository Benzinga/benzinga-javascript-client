import { CommonCalendarEventEntity } from '@benzinga/calendar-commons';

/**
 * Calendar SEC record
 *
 * @export
 * @interface SEC
 * @extends {CommonCalendarEventEntity<'sec'>}
 */
export interface SEC extends CommonCalendarEventEntity<'sec'> {
  /**
   * Accession Number of the filling - Unique identifier assigned automatically to an accepted submission by the SEC.
   * This will be same for all transaction (entries) of that filling.
   *
   * @type {string}
   * @memberof SEC
   */
  accession_number: string;

  amendment: boolean;
  date: string;
  date_field: string;
  date_filing_changed: string;
  filer_cik: number;
  filer_name: string;
  filing_url: string;
  form13_data: string;
  form_data_ownership: string;
  form_type: string;
  is_paper: boolean;
  time: string;
}
