import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Earning } from './entities';
import { EarningsCalendarEnvironment } from './environment';

/**
 * Calendar earnings manager
 *
 * To use, obtain an instance by calling session.getManager(EarningsManager)
 *
 * @export
 * @class EarningsManager
 * @extends {CommonCalendarManager<'earnings', Earning>}
 */
export class EarningsManager extends CommonCalendarManager<'earnings', Earning> {
  constructor(session: Session) {
    super(session, session.getEnvironment(EarningsCalendarEnvironment), 'earnings');
  }

  /**
   * @internal
   *
   * @static
   * @memberof EarningsManager
   */
  public static getName = () => 'benzinga-calendar-earnings';

  /**
   * Fetch calendar earnings data, filtered by params
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<Earning[]>}
   * @memberof EarningsManager
   */
  public getEarnings(params: CommonCalendarQueryParams): SafePromise<Earning[]> {
    return this.request.fetchCalendarData(params);
  }
}
