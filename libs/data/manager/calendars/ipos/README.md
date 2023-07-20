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
## IposCalendarManager
Calendar IPOs manager

To use, obtain an instance by calling session.getManager(IposCalendarManager)

### Methods:



# Interfaces
## Ipo
Calendar IPO record

* `date` (string) - Expected (Actual) IPO Open Date

* `time` (string) - Time of row entry

* `exchange` (string) - Exchange (NYSE, NASDAQ, etc...)

* `open_date_verified` (boolean) - Is the IPO open date verified?

* `pricing_date` (string) - Date of IPO pricing

* `currency` (string) - Currency the data is denominated in

* `price_min` (string) - Minimum open price

* `price_max` (string) - Maximum open price

* `price_public_offering` (string) - Price at which the company sells its shares to investors during an IPO

* `price_open` (string) - Price at open

* `deal_status` (IpoDealStatus) - IPO Status

* `ipo_type` (IpoType) - Type of IPO

* `insider_lockup_days` (number) - Insider lockup period in days

* `insider_lockup_date` (string) - Insider lockup date

* `offering_value` (number) - Value of IPO (offering_shares multiplied by the public offering price)

* `offering_shares` (number) - Number of shares offered in IPO

* `shares_outstanding` (number) -
Temporarily unavailable.
If pre-IPO shares outstanding is an important data field for you, please let us know.

* `lead_underwriters` (string[]) - List of lead underwriter(s)

* `other_underwriters` (string[]) - List of other/secondary underwriter(s)

* `underwriter_quiet_expiration_days` (number) - Underwriter quite expiration period in days

* `underwriter_quiet_expiration_date` (string) - Underwriter quite expiration date

* `notes` (string) - Additional notes provided by the Benzinga Newsdesk where applicable. Notes may include HTML.

