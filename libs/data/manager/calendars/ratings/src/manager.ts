import { CommonCalendarManager, CommonCalendarQueryParams, genUrlParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Rating, RatingsActionCompany } from './entities';
import { RatingsCalendarEnvironment } from './environment';

export interface RatingsQueryParams extends CommonCalendarQueryParams {
  /**
   * Filter by a specific action_company (action for rating). Note that all of these terms are precisely defined
   *
   * @type {RatingsActionCompany}
   * @memberof RatingsQueryParams
   */
  action?: RatingsActionCompany;

  /**
   * One or more analyst ids (analyst_id) separated by a comma.
   *
   * @type {string}
   * @memberof RatingsQueryParams
   */
  analystId?: string;

  /**
   * One or more firm ids (firm_id) separated by a comma.
   *
   * @type {string}
   * @memberof RatingsQueryParams
   */
  firmId?: string;

  /**
   * A comma separated list of analyst (person) ID's to bring back.
   *
   * Omitting will bring back all available analysts.
   *
   * @type {string}
   * @memberof RatingsQueryParams
   */
  analyst?: string;

  /**
   * A comma separated list of analyst firm ID's to bring back.
   * Omitting will bring back all available firms.
   *
   * @type {string}
   * @memberof RatingsQueryParams
   */
  firm?: string;
}

/**
 * Calendar ratings manager
 *
 * To use, obtain an instance by calling session.getManager(RatingsCalendarManager)
 *
 * @export
 * @class RatingsCalendarManager
 * @extends {CommonCalendarManager<'ratings', Rating>}
 */
export class RatingsCalendarManager extends CommonCalendarManager<'ratings', Rating> {
  constructor(session: Session) {
    super(session, session.getEnvironment(RatingsCalendarEnvironment), 'ratings', {
      genUrlParams: (params: CommonCalendarQueryParams & RatingsQueryParams) => {
        const selfParams = {
          ...params,

          action: params.action,
          analyst: params.analyst,
          analyst_id: params.analystId,
          firm: params.firm,
          firm_id: params.firmId,
        };
        return genUrlParams(selfParams);
      },
    });
  }

  /**
   * @internal
   *
   * @static
   * @memberof RatingsCalendarManager
   */
  public static getName = () => 'benzinga-calendar-ratings';

  /**
   * Fetch ratings calendar data, filtered by params
   *
   * @param {RatingsQueryParams} params
   * @return {*}  {SafePromise<Rating[]>}
   * @memberof RatingsCalendarManager
   */
  public getRatings(params: RatingsQueryParams): SafePromise<Rating[]> {
    return this.request.fetchCalendarData(params);
  }
}
