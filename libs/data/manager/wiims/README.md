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
  const wiims = wiimsWrapper.ok;

  console.log(wiims);
}
```

# Classes
## WiimsManager
Why is it Moving or WIIMs manager

Main class for accessing WIIMs API

To use, obtain an instance by calling session.getManager(WiimsManager)

### Methods:
```ts
getWiims (params: WiimsRequestParams): SafePromise<Wiim[]>
```
Fetch WIIms using specified query

*Returns:* SafePromise<[Wiim](#wiim)[]>




# Interfaces
## WiimSecurity
WIIM security

* `exchange` (string) - The listed exchange

* `symbol` (string) - The security symbol

* `name` (string) - The name of the security

* `country` (string) - The country of the security

* `cusip` (string) - CUSIP, available for licenced customers

* `isin` (string) - ISIN, available for licenced customers

## Wiim
WIIM Entity

* `id` (string) - Unique ID of this signal shared across all signal types

* `description` (string) - The listed WIIMs for the security

* `searchKey` (string) - Searched key, if active WIIMs

* `security` ([WiimSecurity](#wiimsecurity)) - Security

* `created` (number) - Created timestamp, UTC.

* `updated` (number) - Last updated timestamp, UTC.

* `expired` (number) - The timestamp, UTC, in which the WIIMs expires and is no longer considered active.

