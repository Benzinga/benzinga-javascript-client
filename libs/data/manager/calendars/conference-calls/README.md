# Calendars manager

Benzinga provides API for querying structured data for conference calls, dividends, earnings (and future earnings dates), economics, pharmaceutical announcements, government trades, guidance, IPOs, secondary offerings, ratings, M&A activity, retail sales, and splits.

There is a separate manager and module for each calendar resource, for example for conference calls:

```ts
import { ConferenceCallsCalendarManager } from '@benzinga/calendar-conference-calls-manager'
```

## Getting started

As with other managers, you must use a session to obtain an instance of a calendar manager:

```ts
import { createSession } from '@benzinga/session';
import { ConferenceCallsCalendarManager } from '@benzinga/calendar-conference-calls-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
});

const manager = session.getManager(ConferenceCallsCalendarManager);
```

After that you may query data. All calendars share the same input parameters, that can be used for filtering data, and also the same name of methods:

* `ConferenceCallsCalendarManager` has `getConferenceCalls(params)` method
* `EconomicsCalendarManager` has `getEconomics(params)` method
* etc...

Example of selecting second page of data, filtered by symbols and date up to 20th January 2022:

```ts
const calendarDataResponse = await manager.getConferenceCalls({
  page: 1,
  symbols: ['AAPL', 'MSFT'],
  dateTo: '2022-01-20'
});

if (calendarDataResponse.err) {
  //handle error
} else {
  console.log(calendarDataResponse.ok);
}
```

Some calendars may add additional filtering params, for example IPO:

```ts
await ipoManager.getConferenceCalls({
  page: 1,
  symbols: ['AAPL', 'MSFT'],
  dateTo: '2022-01-20',
  ipoType: 'Ordinary Shares'
});
```

List of calendar resources and their modules:

| Resource      | Module |
| ----------- | ----------- |
| Conference Calls | `@benzinga/calendar-conference-calls-manager` |
| Dividends | `@benzinga/calendar-dividends-manager` |
| Earnings | `@benzinga/calendar-earnings-manager` |
| Economics | `@benzinga/calendar-economics-manager` |
| FDA | `@benzinga/calendar-fda-manager` |
| Government Trades | `@benzinga/calendar-government-trades-manager` |
| Guidance | `@benzinga/calendar-guidance-manager` |
| IPOs | `@benzinga/calendar-ipos-manager` |
| Mergers and Acquisitions | `@benzinga/calendar-ma-manager` |
| Offerings | `@benzinga/calendar-offerings-manager` |
| Ratings | `@benzinga/calendar-ratings-manager` |
| Retail | `@benzinga/calendar-retail-manager` |
| Signals | `@benzinga/calendar-option-activity-manager` |
| Splits | `@benzinga/calendar-splits-manager` |


# Classes
## ConferenceCallsCalendarManager
Calendar conference calls manager

To use, obtain an instance by calling session.getManager(ConferenceCallsCalendarManager)

### Methods:
```ts
getConferenceCalls (params: CommonCalendarQueryParams): SafePromise<Conference[]>
```
Fetch conference calls by given parameters

*Returns:* SafePromise<[Conference](#conference)[]>




# Interfaces
## Conference
Calendar conference call record

* `access_code` (string) - Access code for conference call if available

* `date` (string) - Announced Date on Calendar

* `exchange` (string) - Exchange (NYSE, NASDAQ, etc...)

* `importance` (string) - Subjective Basis of How Important Event is to Market. 5 = High

* `international_num` (string) - International number to call if outside USA

* `phone_num` (string) - Phone number of conference call

* `reservation_num` (string) - Reservation number for conference call if avaliable

* `start_time` (string) - Time of earnings conference call, in local time

* `time` (string) - Announced Time on Calendar

* `updated` (number) - Last updated timestamp, UTC

* `website_url` (string) - URL of webcast for conference call if avaliable

