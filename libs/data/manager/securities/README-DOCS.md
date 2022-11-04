# Securities manager

This manager and respectful API provide access to data that is usually not going to change after publishing like financial statements, financial ratios, earning reports, asset classification, and share class profile history.

## Getting started

Obtain manager instance via session:

```ts
import { createSession } from '@benzinga/session';
import { ConferenceCallsManager } from '@benzinga/securities-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
});

const manager = session.getManager(SecuritiesManager);
```

Now you can get a full financials report for a given company by ticker symbol:

```ts
const financialsResponse = await manager.getFinancials({
  symbol: 'TSMG'
});

if (financialsResponse.err) {
  //handle error
} else {
  console.log(financialsResponse.result);
}
```

When querying for financials multiple times, manager will emit event `financials_updated`, in case if new financials report contains new data, compared to old one.

Processing event example:

```ts
manager.subscribe(ev => {
  if (ev.type === 'financials_updated') {
    console.log(ev.financials); // new data
  }
})
```