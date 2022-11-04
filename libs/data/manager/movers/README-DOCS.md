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
  const movers = moversResult.result;

  console.log(movers);
}
```

As seen in the example, movers manager also accepts screener query - object or string with conditions for filtering data:

