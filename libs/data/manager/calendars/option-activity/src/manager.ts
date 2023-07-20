import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { OptionsActivity } from './entities';
import { SignalsCalendarEnvironment } from './environment';

/**
 * Calendar signals manager
 *
 * To use, obtain an instance by calling session.getManager(SignalsCalendarManager)
 *
 * @export
 * @class SignalsCalendarManager
 * @extends {CommonCalendarManager<'signals', OptionsActivity>}
 */
export class SignalsCalendarManager extends CommonCalendarManager<'option_activity', OptionsActivity> {
  constructor(session: Session) {
    super(session, session.getEnvironment(SignalsCalendarEnvironment), 'option_activity');
  }

  /**
   * @internal
   *
   * @static
   * @memberof SignalsCalendarManager
   */
  public static getName = () => 'benzinga-calendar-option-activity';

  /**
   * Fetch options activity data, filtered by params
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<OptionsActivity[]>}
   * @memberof SignalsCalendarManager
   */
  public getOptionsActivity(params: CommonCalendarQueryParams): SafePromise<OptionsActivity[]> {
    return this.request.fetchCalendarData(params);
  }
}
