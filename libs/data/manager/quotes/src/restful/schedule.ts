import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import { ScheduleResponse } from '../entities';
import { Session } from '@benzinga/session';
import { QuotesEnvironment } from '../environment';

export class QuotesScheduleRestful extends RestfulClient {
  constructor(session: Session) {
    super(session.getEnvironment(QuotesEnvironment).scheduleUrl, session, { 'x-device-key': true });
  }

  getSchedule = async (): SafePromise<ScheduleResponse> => {
    const url = this.URL(`v2/schedule/day`, {
      apikey: this.session.getEnvironment(QuotesEnvironment).scheduleKey,
    });

    return this.get(url, { allowsAnonymousAuth: true, credentials: 'same-origin' });
  };
}
