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
## GuidanceCalendarManager
Calendar guidance manager

To use, obtain an instance by calling session.getManager(GuidanceCalendarManager)

### Methods:
```ts
getGuidance (params: GuidanceQueryParams): SafePromise<Guidance[]>
```
Fetch guidance calendar data, filtered by params

*Returns:* SafePromise<[Guidance](#guidance)[]>




# Interfaces
## Guidance
Calendar guidance record

* `date` (string) - Announced Date on Calendar

* `time` (string) - Announced Time on Calendar, 24hr format

* `exchange` (string) - Exchange (NYSE, NASDAQ, etc...)

* `currency` (string) - Currency the data is denominated in

* `period` (GuidancePeriod) - Period within-year of the guidance

* `period_year` (number) - Period year of the guidance

* `prelim` (GuidancePreliminaryFlag) - Yes or No for if guidance is a preliminary earnings report

* `is_primary` (GuidancePrimaryFlag) - Specifies type of guidance returned - primary, secondary or all

* `eps_type` (GuidanceEpsType) - Reported EPS Type can be Adjusted, GAAP or FFO. FFO is only used for REITs.

* `eps_guidance_est` (string) - Adjusted EPS Consensus Estimate

* `eps_guidance_max` (string) - Adjusted EPS from Prior Period Max

* `eps_guidance_min` (string) - Adjusted EPS from Prior Period Min

* `eps_guidance_prior_max` (string) - Adjusted EPS from Prior Period Max

* `eps_guidance_prior_min` (string) - Adjusted EPS from Prior Period Min

* `revenue_guidance_est` (string) - Revenue guidance estimate

* `revenue_guidance_max` (string) - Revenue guidance max

* `revenue_guidance_min` (string) - Revenue guidance min

* `revenue_guidance_prior_max` (string) - Revenue guidance max from previous period

* `revenue_guidance_prior_min` (string) - Revenue guidance min from previous period

* `revenue_type` (GuidanceEpsType) - Revenue Type

* `notes` (string) - Additional notes provided by the Benzinga Newsdesk where applicable. Notes may include HTML.

