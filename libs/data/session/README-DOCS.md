# Session Package

The Session package is the go to place to get data from benzinga.

## Usage


TO use this package you must first create a session using `createSession`

```ts
import { createSession } from '@benzinga/session'
```

you can then simply call get the instance by simply calling the function

```ts
const session = createSession();
```

Once you have a session you cant really do much. this is because benzinga uses a modular design.
We call these modules managers. Each manager is responsible for managing a specific resource.
To get started you will first need to use the `authentication` manager to simply login. the `authentication` manager
is the only manager that is included in the session package. To access it simply call the `getManager` function with the `AuthenticationManager` class as a an argument. This will return a authentication manager.

```ts
import { AuthenticationManager, createSession } from '@benzinga/session';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
})
const authManager = session.getManager(AuthenticationManager);
const login = await authManager.login('username', 'password');
if (login.err) {
  console.log(`Error: `, login.err);
} else {
	console.log(`Authentication: `, login.result);
}
```

As you can see from the example above the login function returns a `SafePromise`. A `SafePromise` simply handles catching the thrown error and returns an object that ether has a `err` or a `result`.

Some APIs work without logging in however most APIs require a login.

Once logged in you can use other mangers without any worry.

Benzinga also uses the concept of a feeds. a feed is a subscription based connection. The subscription will allow you subscribe to events as they come in.

Here is an example.

```ts
import { SignalsManager } from '@benzinga/signals-manager';

const signalsManager = session.getManager(SignalsManager);
const feed = signalsManager.createFeed();
feed.setFilters([], ['NEW_HIGH', 'NEW_LOW']);
const subscription = feed.subscribe(event => {
  switch (event.type) {
    case 'signal':
      console.log(event.signal);
      break;
  }
})
feed.open();
setTimeout(() => subscription.unsubscribe(), 60000);
```

in this example we simply subscribe to signals coming from the signals feed for 1 min and then simply unsubscribe.

each manger has a `manager.ts` file this file list all the things you can do with this manager.

## Note

This package is documented width `tsdoc`, and the documentation is being created with the help of `typedoc` library.
It can be created by running `yarn documentation`.

Documentation can be examined as a web app by running VSC Live Server or equivalent on the `./documentation/index.html`


## Adding a New Manager

to add a new manager you need to use the following command.

a manager name must end with the word manager. and it must be in the manager directory in the data directory.

in the following command simply replace `something` with the name of your manager.

```
yarn nx generate @nrwl/web:lib something --directory=data/manager --buildable --importPath=@benzinga/something-manager --publishable
```

A manager must extend the following interface

```ts
export interface Manager<T extends Subscribable<any>> {
  getName: () => string;
  new (name: Session): T;
}
```

what this means in human words is. a manager must take a session as a constructor argument. and it must the a static public function called `getName`. other then that there are no requirements.

