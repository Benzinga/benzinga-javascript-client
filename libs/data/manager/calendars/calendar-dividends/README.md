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
  console.log(calendarDataResponse.result);
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
## DividendsManager
Calendar dividends manager

To use, obtain an instance by calling session.getManager(DividendsManager)

### Methods: 
```ts
getDividends (params: DividendsQueryParams): SafePromise<Dividend[]>
```
Fetch dividends calendar records, filtered by params

*Returns:* SafePromise<[Dividend](#dividend)[]>




# Interfaces
## Dividend
Calendar dividend record

* `date` (string) - Announced Date on calendar

* `notes` (string) - Additional notes provided by the Benzinga Newsdesk where applicable.
Notes may include HTML.

* `exchange` (string) - Exchange (NYSE, NASDAQ, etc...)

* `frequency` (number) - Frequency of the dividend

* `currency` (string) - Currency the data is denominated in

* `dividend` (string) - Dividend value. Expected value is a double if set or empty if null.

* `dividend_prior` (string) - Period prior dividend value. Expected value is a double if set or empty if null.

* `dividend_type` (string) - Type of dividend

* `dividend_yield` (string) - Yield of dividend. Expected value is a double if set or empty if null.

* `ex_dividend_date` (string) - Dividend Ex Date

* `payable_date` (string) - Dividend Payable Date

* `record_date` (string) - Dividend Recorded Date

* `importance` (number) - Subjective basis of how important event is to market. 5 = high

