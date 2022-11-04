import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Offering } from './entities';
import { OfferingsCalendarEnvironment } from './environment';

/**
 * Calendar offerings manager
 *
 * To use, obtain an instance by calling session.getManager(OfferingsManager)
 *
 * @export
 * @class OfferingsManager
 * @extends {CommonCalendarManager<'offerings', Offering>}
 */
export class OfferingsManager extends CommonCalendarManager<'offerings', Offering> {
  constructor(session: Session) {
    super(session, session.getEnvironment(OfferingsCalendarEnvironment), 'offerings');
  }

  /**
   * @internal
   *
   * @static
   * @memberof OfferingsManager
   */
  public static getName = () => 'benzinga-calendar-offerings';

  /**
   * Fetch offerings calendars data, filtered by params
   *
   * @param {CommonCalendarQueryParams} params
   * @return {*}  {SafePromise<Offering[]>}
   * @memberof OfferingsManager
   */
  public getOfferings(params: CommonCalendarQueryParams): SafePromise<Offering[]> {
    return this.request.fetchCalendarData(params);
  }
}
