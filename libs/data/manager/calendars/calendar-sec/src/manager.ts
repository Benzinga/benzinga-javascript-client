import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { SEC } from './entities';
import { SECCalendarEnvironment } from './environment';

export class SECManager extends CommonCalendarManager<'sec', SEC> {
  constructor(session: Session) {
    super(session, session.getEnvironment(SECCalendarEnvironment), 'sec');
  }

  public static getName = () => 'benzinga-calendar-sec';

  public getSEC(params: CommonCalendarQueryParams): SafePromise<SEC[]> {
    return this.request.fetchCalendarData(params);
  }
}
