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
## MergersAndAcquisitionsCalendarManager
Calendar Mergers and acquisitions manager

To use, obtain an instance by calling session.getManager(IposCalendarManager)

### Methods:
```ts
getMergersAndAcquisitions (params: MaQueryParams): SafePromise<MergersAndAcquisitions[]>
```
Fetch calendar data about mergers and acquisitions

*Returns:* SafePromise<[MergersAndAcquisitions](#mergersandacquisitions)[]>




# Interfaces
## MergersAndAcquisitions
Calendar Mergers and Acquisitions record

* `date` (string) - Date of deal announcment

* `date_expected` (string) - Date deal is expected to complete

* `date_completed` (string) - Date of deal completion

* `acquirer_ticker` (string) - Ticker symbol of acquiring company

* `acquirer_exchange` (string) - Exchange for the acquirer ticker

* `acquirer_name` (string) - Name of acquiring company

* `target_ticker` (string) - Ticker symbol of target company

* `target_exchange` (string) - Exchange for the target ticker

* `target_name` (string) - Name of the target company

* `currency` (string) - Currency the data is denominated in

* `deal_type` (MaDealType) - Type of deal

* `deal_size` (string) - Aggregate deal value

* `deal_payment_type` (MaDealPaymentType) - Deal payment type

* `deal_status` (MaDealStatus) - Deal status

* `deal_terms_extra` (string) - Any additional relevant terms

