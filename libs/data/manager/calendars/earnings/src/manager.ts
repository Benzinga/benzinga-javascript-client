import { CommonCalendarManager, CommonCalendarQueryParams, genUrlParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Earning } from './entities';
import { EarningsCalendarEnvironment } from './environment';

export interface EarningsQueryParams extends CommonCalendarQueryParams {
  /**
   * Earnings date field to sort on (newest to oldest for expected and completed; oldest to newest for announced)
   *
   * @type {('desc' | 'asc')}
   * @memberof EarningsQueryParams
   */
  dateSort?: 'desc' | 'asc';
}

/**
 * Calendar earnings manager
 *
 * To use, obtain an instance by calling session.getManager(EarningsCalendarManager)
 *
 * @export
 * @class EarningsCalendarManager
 * @extends {CommonCalendarManager<'earnings', Earning>}
 */
export class EarningsCalendarManager extends CommonCalendarManager<'earnings', Earning> {
  constructor(session: Session) {
    super(session, session.getEnvironment(EarningsCalendarEnvironment), 'earnings', {
      genUrlParams: (params: EarningsQueryParams) => {
        const selfParams = {
          ...params,
          date_sort: params.dateSort,
        };
        return genUrlParams(selfParams);
      },
    });
  }

  /**
   * @internal
   *
   * @static
   * @memberof EarningsCalendarManager
   */
  public static getName = () => 'benzinga-calendar-earnings';

  /**
   * Fetch calendar earnings data, filtered by params
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<Earning[]>}
   * @memberof EarningsCalendarManager
   */
  public getEarnings(params: CommonCalendarQueryParams): SafePromise<Earning[]> {
    return this.request.fetchCalendarData(params);
  }
}
