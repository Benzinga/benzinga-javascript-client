import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Fda } from './entities';
import { FdaCalendarEnvironment } from './environment';

export interface FdaQueryParams extends CommonCalendarQueryParams {
  /**
   * Some date fields (such as the FDA calendar target date) include fuzzy dates such as 2021-Q1.
     When filtering, you may choose to allow fuzzy date matching, or strict date matching that searches for ONLY dates that have an exact match within the given date period.
   *
   * @type {boolean}
   * @memberof FdaQueryParams
   */
  dateSearchStrict?: boolean;

  /**
   * One or more security identifiers separated by a comma. Maximum 50 securities.
   * Security identifiers must be in the format of ticker symbols, only for US-listed equities.
   *
   * @type {string}
   * @memberof FdaQueryParams
   */
  securities?: string;
}

/**
 * Calendar FDA manager
 *
 * To use, obtain an instance by calling session.getManager(EconomicsFdaManagerManager)
 *
 * @export
 * @class FdaManager
 * @extends {CommonCalendarManager<'fda', Fda>}
 */
export class FdaManager extends CommonCalendarManager<'fda', Fda> {
  constructor(session: Session) {
    super(session, session.getEnvironment(FdaCalendarEnvironment), 'fda');
  }

  /**
   * @internal
   *
   * @static
   * @memberof FdaManager
   */
  public static getName = () => 'benzinga-calendar-fda';

  /**
   * Fetch FDA calendar data, filtered by params
   *
   * @param {FdaQueryParams} params
   * @return {*}  {SafePromise<Fda[]>}
   * @memberof FdaManager
   */
  public getFda(params: FdaQueryParams): SafePromise<Fda[]> {
    return this.request.fetchCalendarData(params, {
      date_search_strict: params.dateSearchStrict,
      securities: params.securities,
    });
  }
}
