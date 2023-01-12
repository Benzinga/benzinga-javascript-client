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
## RatingsManager
Calendar ratings manager

To use, obtain an instance by calling session.getManager(RatingsManager)

### Methods: 
```ts
getRatings (params: RatingsQueryParams): SafePromise<Rating[]>
```
Fetch ratings calendar data, filtered by params

*Returns:* SafePromise<[Rating](#rating)[]>




# Interfaces
## Rating
Calendar rating record

* `id` (string) - Unique ID of this entry

* `date` (Date) - Date for rating

* `time` (string) - Time for rating

* `ticker` (string) - Ticker symbol of company that is subject of rating

* `exchange` (string) - Exchange (NYSE, NASDAQ, etc...)

* `name` (string) - Name of company that is subject of rating

* `currency` (string) - Currency the data is denominated in

* `actionPt` (RatingsActionType) - Description of the change in price target from firm's last price target

* `actionCompany` (RatingsActionCompany) - Description of the change in rating from firm's last rating.
Note that all of these terms are precisely defined.

* `ratingCurrent` (string) - The analyst's rating for the company

* `ptCurrent` (string) - Analyst's current price target

* `ratingPrior` (string) - Prior analyst rating for the company

* `ptPrior` (string) - Analyst's prior price target

* `url` (string) - URL for analyst ratings page for this ticker on Benzinga.com

* `urlCalendar` (string) - URL for analyst ratings page for this ticker on Benzinga.com

* `urlNews` (string) - URL for analyst ratings news articles for this ticker on Benzinga.com

* `analyst` (string) - Name of the analyst firm that published the rating

* `analystId` (string) - Id of the analyst

* `analystName` (string) - Name of the analyst (person) that published the rating

* `ratingsAccuracy` (IApiRatingsAccuracy) - Analyst accuracy scores

