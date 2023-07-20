import { CommonCalendarManager, CommonCalendarQueryParams, genUrlParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Split } from './entities';
import { SplitsCalendarEnvironment } from './environment';

export interface SplitsQueryParams extends CommonCalendarQueryParams {
  /**
   * Date to filter and sort calendar by. Default is announced.
   *
   * @type {string}
   * @memberof SplitsQueryParams
   */
  dateSearchField?: string;
}

/**
 * Calendar splits manager
 *
 * To use, obtain an instance by calling session.getManager(SplitsCalendarManager)
 *
 * @export
 * @class SplitsCalendarManager
 * @extends {CommonCalendarManager<'splits', Split>}
 */
export class SplitsCalendarManager extends CommonCalendarManager<'splits', Split> {
  constructor(session: Session) {
    super(session, session.getEnvironment(SplitsCalendarEnvironment), 'splits', {
      genUrlParams: (params: CommonCalendarQueryParams & SplitsQueryParams) => {
        const selfParams = {
          ...params,
          date_search_field: params.dateSearchField,
        };
        return genUrlParams(selfParams);
      },
    });
  }

  public static getName = () => 'benzinga-calendar-splits';

  public getSplits(params: SplitsQueryParams): SafePromise<Split[]> {
    return this.request.fetchCalendarData(params);
  }
}
