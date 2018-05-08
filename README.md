<h1 align="center">
<img src="https://github.com/jagql/framework/raw/master/resources/images/jagql.svg?sanitize=true" width=200>
<br>
jagql
</h1>

[![Build Status](https://travis-ci.org/jagql/framework.svg?branch=master)](https://travis-ci.org/jagql/framework)
[![codecov](https://codecov.io/gh/jagql/framework/branch/master/graph/badge.svg)](https://codecov.io/gh/jagql/framework)
[![npm (scoped)](https://img.shields.io/npm/v/@jagql/framework.svg?colorB=cb3837)](https://npmjs.com/@jagql/framework)
[![Dependencies Status](https://david-dm.org/jagql/framework.svg)](https://david-dm.org/jagql/framework)
[![Greenkeeper badge](https://badges.greenkeeper.io/jagql/framework.svg)](https://greenkeeper.io/)

<p align="center">
  <a href="https://jagql.github.io/framework/">
    <img src="https://img.shields.io/badge/DOCS-API_REFERENCE-6699ff.svg?longCache=true&style=for-the-badge">
  </a>
</p>
- - - - - - 


A resource driven framework to set up a {json:api} + GraphQL endpoint in record time. 



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
