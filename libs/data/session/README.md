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



# Classes
## Session
Core class of Benzinga SDK

To access any of SDK managers, you must create a session first

### Methods: 
```ts
getEnvironment <M extends Environment, R extends ReturnType<M["getEnvironment"]>>(managerEnv: M): R
```
Get environment for given manager

Internal usage.

*Returns:* R


```ts
getAuthenticationManager (): AuthenticationManager
```
Shortcut function to get AuthenticationManager

*Returns:* AuthenticationManager


```ts
getManager <T extends Subscribable<any>>(managerName: Manager<T>): T
```
Get instance of a manager

This is the main way and preferred of getting Manager instances

*Returns:* T


## AuthenticationManager
Authentication manager

Deals with authentication in the SDK
This manager is always available as one of the core managers

All other managers that work with Benzinga API will not work until
you authenticate using this manager

Use your Benzinga API key as 'apiKey' environment variable for this manager to use API key authentication - in this case no further invocations of that managers are needed

### Methods: 
```ts
login (username: string, password: string, sessionOptions?: SessionOptions): SafePromise<Authentication>
```
Perform login with given username and password

On success, will return Authentication object and persist the session data
Which means that other APIs can be used

*Returns:* SafePromise<Authentication>


```ts
logout (): SafePromise<undefined>
```
Perform a logout and clear all session data

Will return an error if there is no session data (not logged in)

*Returns:* SafePromise<undefined>


```ts
register (user: RegisterUser, sessionOptions?: SessionOptions): SafePromise<Authentication>
```
Register a new user

*Returns:* SafePromise<Authentication>


```ts
forgotPassword (email: string): SafePromise<undefined>
```
Send request for forgotten password

*Returns:* SafePromise<undefined>


```ts
changePassword (currentPassword: string, newPassword: string): SafePromise<undefined>
```
Change password

Must be logged in to call this method

*Returns:* SafePromise<undefined>


```ts
isLoggedIn (): boolean
```
Are you currently logged in?

*Returns:* boolean


```ts
isUsingApiKey (): boolean
```
Returns true if 'apiKey' was supplied in the environment, which means
we are using Licensing API keys

*Returns:* boolean


```ts
smsConfirm (token: string): SafePromise<boolean>
```
Confirm SMS with a token

*Returns:* SafePromise<boolean>


```ts
smsRequest (): SafePromise<boolean>
```
Request SMS confirmation

*Returns:* SafePromise<boolean>




# Interfaces
