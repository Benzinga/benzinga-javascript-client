# Benzinga SDK

Benzinga Typescript SDK is a collection of modules designed to provide easy interface for working with Benzinga APIs.

## Getting Started

Requires Node.js version 14 or newer.

SDK uses modular structure, where each module is a separate npm package. Therefore, you should install needed packages individually.

However, there is one core package that is needed to operate with other modules - `@benzinga/session`. Make sure to install it first:

```
npm install @benzinga/session
```

For instructions on using that module and mainly Session object, please refer to `@benzinga/session` documentation.

## Features

* Written in Typescript
* Works both in browser and node.js environments
* Modular
* Event-based
* Aside from just providing direct CRUD-like API for Benzinga resources, also provides smarter implementations for each of the resources with caching, deep comparison, etc.