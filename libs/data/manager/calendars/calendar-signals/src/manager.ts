import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { OptionsActivity } from './entities';
import { SignalsCalendarEnvironment } from './environment';

/**
 * Calendar signals manager
 *
 * To use, obtain an instance by calling session.getManager(SignalsManager)
 *
 * @export
 * @class SignalsManager
 * @extends {CommonCalendarManager<'signals', OptionsActivity>}
 */
export class SignalsManager extends CommonCalendarManager<'signals', OptionsActivity> {
  constructor(session: Session) {
    super(session, session.getEnvironment(SignalsCalendarEnvironment), 'signals');
  }

  /**
   * @internal
   *
   * @static
   * @memberof SignalsManager
   */
  public static getName = () => 'benzinga-calendar-signals';

  /**
   * Fetch options activity data, filtered by params
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<OptionsActivity[]>}
   * @memberof SignalsManager
   */
  public getOptionsActivity(params: CommonCalendarQueryParams): SafePromise<OptionsActivity[]> {
    return this.request.fetchCalendarData(
      params,
      {},
      {
        overrideUrl: 'v1/signal/option_activity',
        responseIsEntitiesList: true,
      },
    );
  }
}
