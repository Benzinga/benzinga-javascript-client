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
## EconomicsCalendarManager
Calendar economics manager

To use, obtain an instance by calling session.getManager(EconomicsCalendarManager)

### Methods:
```ts
getEconomics (params: CommonCalendarQueryParams): SafePromise<Economics[]>
```
Fetch calendar economics data, filtered by params

*Returns:* SafePromise<[Economics](#economics)[]>




# Interfaces
## Economics
Calendar economics record

* `date` (string)

* `time` (string)

* `country` (string) - 3-Character Country Code (USA, CAN, etc...)

* `event_name` (string) - Economic Event

* `event_period` (string) - Period of Time (Q1, September, Third Week of August,...)

* `period_year` (number) - Period Year

* `actual` (string) - Value of economic indicator

* `actual_t` (string) - Unit for actual field

* `consensus` (string) - Estimate for actual field

* `consensus_t` (string) - Unit for consensus field

* `prior` (string) - Value of actual field for previous period

* `prior_t` (string) - Unit for prior field

* `importance` (number) - Subjective basis of how important event is to market. 5 = High

* `description` (string) - Event Description

