import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Economics } from './entities';
import { EconomicsCalendarEnvironment } from './environment';

/**
 * Calendar economics manager
 *
 * To use, obtain an instance by calling session.getManager(EconomicsCalendarManager)
 *
 * @export
 * @class EconomicsCalendarManager
 * @extends {CommonCalendarManager<'economics', Economics>}
 */
export class EconomicsCalendarManager extends CommonCalendarManager<'economics', Economics> {
  constructor(session: Session) {
    super(session, session.getEnvironment(EconomicsCalendarEnvironment), 'economics');
  }

  /**
   * @internal
   *
   * @static
   * @memberof EconomicsCalendarManager
   */
  public static getName = () => 'benzinga-calendar-economics';

  /**
   * Fetch calendar economics data, filtered by params
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<Economics[]>}
   * @memberof EconomicsCalendarManager
   */
  public getEconomics(params: CommonCalendarQueryParams): SafePromise<Economics[]> {
    return this.request.fetchCalendarData(params);
  }
}
