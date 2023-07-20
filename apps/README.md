## Benzinga Data Libraries examples

This repo contains introductory documentation and examples for using Benzinga Javascript SDK, which is made of "data libraries"

## Getting started

The SDK is highly modular, allowing you to import highly-specific modules for needed APIs.

However, there is one fundamental module, which you must initialize first before using other modules, called `@benzinga/session`.

```ts
import { createSession } from '@benzinga/session'

const session = createSession();
```

This code will create an instance of session, that can be used to retrieve instances of other modules.

You can create whatever amount of sessions you want, but generally you won't need more than one, which is shared between code pieces of your application.

## Using other modules

The core concept of Benzinga SDK is the `manager`, and each module exports a manager class, which exposes all features, functions and data related to the module.

To obtain a manager instance, simply call `getManager()` method on the previously created session and pass the class of the desired manager:

```ts
import { AuthenticationManager, createSession } from '@benzinga/session';

const session = createSession()

const authManager = session.getManager(AuthenticationManager);
```

And after that you may use the `authManager` instance.

## Environment

There is also so-called `environment` in the SDK, which is basically set of all settings for all managers.

These settings can be passed to `createSession()` method during session creation. By default it's just an empty object (`{}`).

To pass settings to a specific manager, just set a key in the environment object as a name of the manager in lowercase, and desired settings as a value.

For example:

```ts
const session = createSession({
  'benzinga-news': {
    socketUrl: 'http://example.ws'
  }
});

//This manager will use the settings from the environment (socketUrl)
const newsManager = session.getManager(NewsManager);
```
For list of available settings for each of module, refer to their respective `environment.ts` files.

## Authentication

To be able to call any API of the Benzinga SDK, you must authenticate first.

This is done using `AuthenticationManager`, which is used in example above.
It's also the only manager which is exported from core `@benzinga/session` package.

You can also use shortcut method for obtaining an instance of that manager:

```ts
const authManager =  session.getAuthenticationManager()
```

There are currently two types of authentication supported by the SDK:

* Using regular Benzinga Pro credentials (username/password)

```ts
const loginResult = await authManager.login('username', 'password');
```

* Using Licensing API key, which should be passed in the environment to `AuthenticationManager`:

```ts
const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR API KEY GOES HERE>',
  }
});
```

## Safe Promises

We do not like throwing exceptions/errors in SDK, because they break natural flow of the app.

Instead, we use safe-wrappers called `SafeType` and `SafePromise` for sync and async values respectively.

They are regular objects, which either contain an `err` key, which means there was an error. Otherwise, the actual value will be present in `ok` field. These two states are mutually exclusive.

Example using that approach:

```ts
const safeLoginResult = await authManager.login('username', 'password');

if (safeLoginResult.err) {
  console.error(`There was an error during login: ${safeLoginResult.err}`);
  return;
}

console.log(`Login ok: ${safeLoginResult.ok}`)
```

So, make sure to check for `err` property every time you deal with methods from the SDK.

## Examples list

* Movers API ([example](src/examples/movers.ts), [api docs](https://docs.benzinga.com/benzinga/movers-v1.html))
* Securities API ([example](src/examples/securities.ts), [api docs](https://docs.benzinga.com/benzinga/fundamentals-v2.1.html))
* WIIMs API ([example](src/examples/wiims.ts), [api docs](https://docs.benzinga.com/benzinga/wiims.html))