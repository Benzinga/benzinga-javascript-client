import { getGlobalSession } from '../session';

import { ConferenceCallsCalendarManager } from '@benzinga/calendar-conference-calls-manager';

export default async () => {
  const manager = getGlobalSession().getManager(ConferenceCallsCalendarManager);

  manager.subscribe(event => {
    console.log(event);
  });

  console.log(
    await manager.getConferenceCalls({
      dateFrom: '2021-07-01',
      dateTo: '2022-08-20',
      symbols: ['TSLA', 'AAPL', 'MDRN'],
    }),
  );
};
