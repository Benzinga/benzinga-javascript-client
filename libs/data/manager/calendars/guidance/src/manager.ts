import { CommonCalendarManager, CommonCalendarQueryParams, genUrlParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Guidance } from './entities';
import { GuidanceCalendarEnvironment } from './environment';

export interface GuidanceQueryParams extends CommonCalendarQueryParams {
  /**
   * Determines if guidance returned is primary, secondary or all. Default set to true.
   *
   * @type {boolean}
   * @memberof GuidanceQueryParams
   */
  isPrimary?: boolean;
}

/**
 * Calendar guidance manager
 *
 * To use, obtain an instance by calling session.getManager(GuidanceCalendarManager)
 *
 * @export
 * @class ConferenceCallsCalendarManager
 * @extends {CommonCalendarManager<'conference-calls', Conference>}
 */
export class GuidanceCalendarManager extends CommonCalendarManager<'guidance', Guidance> {
  constructor(session: Session) {
    super(session, session.getEnvironment(GuidanceCalendarEnvironment), 'guidance', {
      genUrlParams: (params: GuidanceQueryParams) => {
        const selfParams = {
          ...params,
          is_primary: params.isPrimary,
        };
        return genUrlParams(selfParams);
      },
    });
  }

  /**
   * @internal
   *
   * @static
   * @memberof GuidanceCalendarManager
   */
  public static getName = () => 'benzinga-calendar-guidance';

  /**
   * Fetch guidance calendar data, filtered by params
   *
   * @param {GuidanceQueryParams} params
   * @return {*}  {SafePromise<Guidance[]>}
   * @memberof GuidanceCalendarManager
   */
  public getGuidance(params: GuidanceQueryParams): SafePromise<Guidance[]> {
    return this.request.fetchCalendarData(params);
  }
}
