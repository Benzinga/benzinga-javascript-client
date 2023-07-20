import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Retail } from './entities';
import { RetailCalendarEnvironment } from './environment';

/**
 * Calendar retail manager
 *
 * To use, obtain an instance by calling session.getManager(RetailManager)
 *
 * @export
 * @class RetailManager
 * @extends {CommonCalendarManager<'retail', Retail>}
 */
export class RetailManager extends CommonCalendarManager<'retail', Retail> {
  constructor(session: Session) {
    super(session, session.getEnvironment(RetailCalendarEnvironment), 'retail');
  }

  /**
   * @internal
   *
   * @static
   * @memberof RetailManager
   */
  public static getName = () => 'benzinga-calendar-retail';

  /**
   * Fetch retail calendar data, filtered by params
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<Retail[]>}
   * @memberof RetailManager
   */
  public getRetail(params: CommonCalendarQueryParams): SafePromise<Retail[]> {
    return this.request.fetchCalendarData(params);
  }
}
