# Calendars manager

Benzinga provides API for querying structured data for conference calls, dividends, earnings (and future earnings dates), economics, pharmaceutical announcements, guidance, IPOs, secondary offerings, ratings, M&A activity, retail sales, and splits.

There is a separate manager and module for each calendar resource, for example for conference calls:

```ts
import { ConferenceCallsManager } from '@benzinga/calendar-conference-calls-manager'
```

## Getting started

As with other managers, you must use a session to obtain an instance of a calendar manager:

```ts
import { createSession } from '@benzinga/session';
import { ConferenceCallsManager } from '@benzinga/calendar-conference-calls-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
});

const manager = session.getManager(ConferenceCallsManager);
```

After that you may query data. All calendars share the same input parameters, that can be used for filtering data, and also the same name of methods:

* `ConferenceCallsManager` has `getConferenceCalls(params)` method
* `EconomicsManager` has `getEconomics(params)` method
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
| Guidance | `@benzinga/calendar-guidance-manager` |
| IPOs | `@benzinga/calendar-ipos-manager` |
| Mergers and Acquisitions | `@benzinga/calendar-ma-manager` |
| Offerings | `@benzinga/calendar-offerings-manager` |
| Ratings | `@benzinga/calendar-ratings-manager` |
| Retail | `@benzinga/calendar-retail-manager` |
| Signals | `@benzinga/calendar-signals-manager` |
| Splits | `@benzinga/calendar-splits-manager` |


# Classes
## EarningsManager
Calendar earnings manager

To use, obtain an instance by calling session.getManager(EarningsManager)

### Methods: 
```ts
getEarnings (params: CommonCalendarQueryParams): SafePromise<Earning[]>
```
Fetch calendar earnings data, filtered by params

*Returns:* SafePromise<[Earning](#earning)[]>




# Interfaces
## Earning
Earning

* `date` (string) - Announced Date on Calendar

* `date_confirmed` (string) - If the report date was confirmed (vs est)

* `time` (string) - Announced Time on Calendar, 24hr format

* `ticker` (string) - Ticker Symbol (F, MSFT, etc...)

* `exchange` (string) - Exchange (NYSE, NASDAQ, etc...)

* `name` (string) - Name of security

* `currency` (string) - Currency the data is denominated in

* `period` (string) - Period of the earnings actual

* `period_year` (number) - Period Year of the earnings actual

* `eps_type` (string) - EPS Type

* `eps` (string) - Comparable and Adjusted Earnings Per Share

* `eps_est` (string) - Adjusted EPS Consensus Aggregate Analyst Estimate

* `eps_prior` (string) - Adjusted EPS from Prior Period

* `eps_surprise` (string) - EPS deviation from estimate

* `eps_surprise_percent` (string) - Deviation from estimate as percentage

* `revenue_type` (string) - Revenue Type

* `revenue` (string) - Revenue

* `revenue_est` (string) - Revenue estimate

* `revenue_prior` (string) - Revenue value for previous period

* `revenue_surprise` (string) - Revenue deviation from estimate

* `revenue_surprise_percent` (string) - Deviation from estimate as percentage

* `notes` (string) - Additional notes provided by the Benzinga Newsdesk where applicable.
Notes may include HTML.

