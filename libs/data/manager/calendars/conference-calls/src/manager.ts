import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Conference } from './entities';
import { ConferenceCallsCalendarEnvironment } from './environment';

/**
 * Calendar conference calls manager
 *
 * To use, obtain an instance by calling session.getManager(ConferenceCallsCalendarManager)
 *
 * @export
 * @class ConferenceCallsCalendarManager
 * @extends {CommonCalendarManager<'conference-calls', Conference>}
 */
export class ConferenceCallsCalendarManager extends CommonCalendarManager<'conference-calls', Conference> {
  constructor(session: Session) {
    super(session, session.getEnvironment(ConferenceCallsCalendarEnvironment), 'conference-calls', {
      formatResponse: (data: unknown): Conference[] => {
        return (data?.['conference'] ?? []) as Conference[];
      },
    });
  }

  /**
   * @internal
   *
   * @static
   * @memberof ConferenceCallsCalendarManager
   */
  public static getName = () => 'benzinga-calendar-confernce-calls';

  /**
   * Fetch conference calls by given parameters
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<Conference[]>}
   * @memberof ConferenceCallsCalendarManager
   */
  public getConferenceCalls(params: CommonCalendarQueryParams): SafePromise<Conference[]> {
    return this.request.fetchCalendarData(params);
  }
}
