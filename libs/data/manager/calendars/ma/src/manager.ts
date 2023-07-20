import { CommonCalendarManager, CommonCalendarQueryParams, genUrlParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { MergersAndAcquisitions } from './entities';
import { MaCalendarEnvironment } from './environment';

export interface MaQueryParams extends CommonCalendarQueryParams {
  /**
   * M&A date field to sort on (newest to oldest for expected and completed; oldest to newest for announced)
   *
   * @type {('expected' | 'completed' | 'announced')}
   * @memberof MaQueryParams
   */
  dateSort?: 'expected' | 'completed' | 'announced';
}

/**
 * Calendar Mergers and acquisitions manager
 *
 * To use, obtain an instance by calling session.getManager(IposCalendarManager)
 *
 * @export
 * @class MergersAndAcquisitionsCalendarManager
 * @extends {CommonCalendarManager<'ma', MergersAndAcquisitions>}
 */
export class MergersAndAcquisitionsCalendarManager extends CommonCalendarManager<'ma', MergersAndAcquisitions> {
  constructor(session: Session) {
    super(session, session.getEnvironment(MaCalendarEnvironment), 'ma', {
      genUrlParams: (params: MaQueryParams) => {
        const selfParams = {
          ...params,
          date_sort: params.dateSort,
        };
        return genUrlParams(selfParams);
      },
    });
  }

  /**
   * @internal
   *
   * @static
   * @memberof MergersAndAcquisitionsCalendarManager
   */
  public static getName = () => 'benzinga-calendar-ma';

  /**
   * Fetch calendar data about mergers and acquisitions
   *
   * @param {MaQueryParams} params
   * @return {*}  {SafePromise<MergersAndAcquisitions[]>}
   * @memberof MergersAndAcquisitionsCalendarManager
   */
  public getMergersAndAcquisitions(params: MaQueryParams): SafePromise<MergersAndAcquisitions[]> {
    return this.request.fetchCalendarData(params);
  }
}
