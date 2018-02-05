[![Build Status](https://travis-ci.org/coding-blocks/jsonapi-server.svg?branch=master)](https://travis-ci.org/coding-blocks/jsonapi-server)
[![Coverage Status](https://coveralls.io/repos/github/coding-blocks/jsonapi-server/badge.svg?branch=master)](https://coveralls.io/github/coding-blocks/jsonapi-server?branch=master)
[![npm version](https://badge.fury.io/js/%40coding-blocks%2Fjsonapi-server.svg)](https://badge.fury.io/js/%40coding-blocks%2Fjsonapi-server)
[![Dependencies Status](https://david-dm.org/coding-blocks/jsonapi-server.svg)](https://david-dm.org/coding-blocks/jsonapi-server)

# JaG API (`jagapi`)

[![Greenkeeper badge](https://badges.greenkeeper.io/coding-blocks/jsonapi-server.svg)](https://greenkeeper.io/)


## About this Fork
**NOTE: This is a fork of holidayextra's [jsonapi-server](https://github.com/holidayextras/jsonapi-server)
We have merged a lot of pending PRs on the original repo that we felt we would gain advantage from. The original project
was coing a bit too slowly for our needs.**

### Differences from upstream

#### `primaryKey` is configurable
In upstream, keys are by default `uuid` and are taken from DB, if `generateId` = `true`
We instead use a different property `primaryKey`, whose possible values are

 - `uuid` : Uses UUID v4 (generated from the client)
 - `autoincrement` : Uses AUTOINCREMENT integers

\*In future there might be other types of primaryKeys if required.

#### relationship key type is configurable
When creating a field, you can state how to relate it

```javascript
jsonApi.define({
  ... 
  attributes: {
    ... 
    author: jsonApi.Joi.one('people').uidType('uuid')
    ...
  }
})
```

_**You'd want to use our version of jsonapi-store-\[\*\] plugins with this
as the original versions will not be compatible with this**_

_The old readme [here](README-old.md) is verbatim copy of the original project_
