import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Ipo, IpoType } from './entities';
import { IpoCalendarEnvironment } from './environment';

export interface IpoQueryParams extends CommonCalendarQueryParams {
  /**
   * IPO type for filtering
   *
   * @type {IpoType}
   * @memberof IpoQueryParams
   */
  ipoType: IpoType;
}

/**
 * Calendar IPOs manager
 *
 * To use, obtain an instance by calling session.getManager(IposManager)
 *
 * @export
 * @class IposManager
 * @extends {CommonCalendarManager<'ipos', Ipo>}
 */
export class IposManager extends CommonCalendarManager<'ipos', Ipo> {
  constructor(session: Session) {
    super(session, session.getEnvironment(IpoCalendarEnvironment), 'ipos');
  }

  public static getName = () => 'benzinga-calendar-ipos';

  public getIpos(params: IpoQueryParams): SafePromise<Ipo[]> {
    return this.request.fetchCalendarData(params, {
      ipo_type: params.ipoType,
    });
  }
}
