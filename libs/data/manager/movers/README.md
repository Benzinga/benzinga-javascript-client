# Movers Manager

## Getting started

Obtain manager instance via session and then you are able to query movers data:

```ts
import { createSession } from '@benzinga/session';
import { MoversManager } from '@benzinga/movers-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
});

const manager = session.getManager(MoversManager);

const moversResult = await manager.getMovers({
  from: '2020-03-01',
  screenerQuery: {
    marketCap_lt: 400
  }
});

if (moversResult.err) {
  console.error(moversResult.err);
} else {
  const movers = moversResult.ok;

  console.log(movers);
}
```

As seen in the example, movers manager also accepts screener query - object or string with conditions for filtering data:



# Classes
## MoversManager
Movers manager

Main class for calling Movers API

To use, obtain an instance by calling session.getManager(MoversManager)

### Methods: 
```ts
getMovers (query: MoversQuery): SafePromise<Movers>
```
Fetch movers data by given query

*Returns:* SafePromise<[Movers](#movers)>




# Interfaces
## Movers
Movers entity

* `gainers` ([Mover](#mover)[]) - List of gainers

* `losers` ([Mover](#mover)[]) - Lits of losers

* `all` ([Mover](#mover)[]) - All movers that fulfilled the  (gainers and losers)

* `fromDate` (string) - Datetime of the start of the period used to calculate movers.

* `toDate` (string) - Datetime of the end of the period used to calculate movers.

* `snapTo` (string) 

* `usePreviousClose` (boolean) - True if the previous regular session close is being used to calculated price change fields.

## Mover
Single mover entity

* `symbol` (string) - Ticker Symbol (F, MSFT, etc...)

* `change` (number) - Price change

* `changePercent` (number) - Price change percent

* `volume` (number) - Volume for the instrument over the report period.

* `close` (number) - The last known price (up to a minute delayed if in an active session) of the instrument.

* `companyName` (string) - Company name

* `averageVolume` (number) - Average 50 date volume for the instrument

* `previousClose` (number) - Previous close price

* `marketCap` (string) - Market cap

* `gicsSectorName` (string) - GICS Sector name

## MoversScreenerQuery
Filters movers by screener query.
A screener query is a set of conditions.

* `previousClose_lt` (number) 

* `previousClose_gt` (number) 

* `marketCap_lt` (number) 

* `marketCap_gt` (number) 

* `volume_lt` (number) 

* `volume_gt` (number) 

* `symbol_in` (string[]) 

* `sector_in` (string[]) 

* `industry_in` (string[]) 

