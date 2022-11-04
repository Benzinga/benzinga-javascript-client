# WIIMs Manager

## Getting started

Obtain manager instance via session and make a call to receive WIIms filtered by country and symbol type:

```ts
import { createSession } from '@benzinga/session';
import { WiimsManager } from '@benzinga/wiims-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
});

const manager = session.getManager(WiimsManager);

const wiimsWrapper = await manager.getWiims({
  country: 'US',
  searchKeys: 'MRNA',
  searchKeysType: 'symbol',
});

if (wiimsWrapper.err) {
  console.error(wiimsWrapper.err);
} else {
  const wiims = wiimsWrapper.result;

  console.log(wiims);
}
```