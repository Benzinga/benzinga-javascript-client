# Quotes and delayed quotes manager

This manager provides access to Benzinga quotes data.

## Getting started

First, use a session to obtain an instance of a quotes manager:

```ts
import { createSession } from '@benzinga/session';
import { QutoesManager } from '@benzinga/calendar-conference-calls-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
})

const manager = session.getManager(ConferenceCallsManager);
```

Now can you use the manager for next features:

### Get delayed quotes, schedule or ticker details data directly from server

```ts
const delayedQuotesResponse = await manager.getDelayedQuotes(['SYM1', 'SYM2']);

if (!delayedQuotesResponse.err) {
  console.log(delayedQuotesResponse.ok);
}
```

```ts
const tickersResponse = await manager.getTickerDetails(['SYM1', 'SYM2']);

if (!tickersResponse.err) {
  console.log(tickersResponse.ok);
}
```

### Get detailed quotes or short interest data

These methods actually cache data in memory, which means only call request for same data will make a request to server. This is by-design to allow usage of the manager in highly-loaded UI.


```ts
const shortInterestResponse = await manager.getShortInterest({
  symbols: ['AAPL', 'MRCS']
});

const detailedQuotesResponse = await manager.getDetailedQuotes(['MSFT', 'ARBC']);
```

### Try to get cached values of each of the items

These methods will return undefined if no value is present in cache:

```ts
const quote = manager.getCachedQuote('SMDC');
const quoteDetail = manager.getCachedQuoteDetail('SMDC');
```

### Create feed for real-time data processing

```ts
const feed = manager.createQuoteFeed('AAPL');

feed.subscribe(ev => {
  if (ev.type === 'quote:quote') {
    //ev.quote contains updated quote
  }

  if (ev.type === 'quote:quote_details') {
    //ev.detail contains new quote details
  }
});

//You may also access latest data on the feed

const feedQuote = feed.getQuote();
const feedDetail = feed.getDetail();
```