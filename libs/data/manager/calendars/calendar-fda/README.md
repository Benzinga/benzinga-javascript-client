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
## FdaManager
Calendar FDA manager

To use, obtain an instance by calling session.getManager(EconomicsFdaManagerManager)

### Methods: 
```ts
getFda (params: FdaQueryParams): SafePromise<Fda[]>
```
Fetch FDA calendar data, filtered by params

*Returns:* SafePromise<[Fda](#fda)[]>




# Interfaces
## FdaCompanySecurity
FDA Company security

* `exchange` (string) 

* `symbol` (string) 

## FdaCompany
FDA Company

* `id` (string) 

* `name` (string) 

* `cik` (string) 

* `securities` ([FdaCompanySecurity](#fdacompanysecurity)[]) 

## FdaDrug
FDA Drug info

* `id` (string) 

* `name` (string) 

* `indication_symptom` (string) 

* `generic` (boolean) 

## Fda
Calendar FDA record

* `event_type` (FdaEventType) - Specifies which type of event the row represents.

* `date` (string) - Date on which Benzinga received the information

* `time` (string) - Time at which Benzinga received the information

* `companies` ([FdaCompany](#fdacompany)[]) - Companies developing the drug

* `drug` ([FdaDrug](#fdadrug)) 

* `status` (string) - The announced status of the drug

* `nic_number` (string) - The US National Library of Medicine's individual identifier for each clinical trial

* `target_date` (string) - The announced target date

Format: YYYY-MM-DD, YYYY-MM, YYYY-Q[1-4], YYYY-H[1-2], or YYYY-[EARLY, MID, LATE]

* `outcome_brief` (FdaOutcomeBrief) - The significance/outcome of the announcement, categorized

* `outcome` (string) - The significance/outcome of the announcement

* `commentary` (string) - Additional information beyond the few-sentence outcome

* `source_type` (FdaSourceType) - The type of source from which this data was obtained

* `source_link` (string) - The URL of the source

* `notes` (string) - Additional notes provided by the Benzinga Newsdesk where applicable. Notes may include HTML.

* `created` (number) - Object creation Unix timestamp, UTC

