'use strict'
const debug = require('debug')

function overrideDebugOutputHelper (debugFns, outputFnFactory) {
  Object.keys(debugFns).filter(key => key.substr(0, 2) !== '__').forEach(key => {
    if (debugFns[key] instanceof Function) {
      debugFns[key] = outputFnFactory(debugFns[key].namespace)
      return null
    }
    return overrideDebugOutputHelper(debugFns[key], outputFnFactory)
  })
}

const debugging = module.exports = {
  handler: {
    search: debug('jagql:handler:search'),
    find: debug('jagql:handler:find'),
    create: debug('jagql:handler:create'),
    update: debug('jagql:handler:update'),
    delete: debug('jagql:handler:delete')
  },
  reroute: debug('jagql:reroute'),
  include: debug('jagql:include'),
  filter: debug('jagql:filter'),
  validationInput: debug('jagql:validation:input'),
  validationOutput: debug('jagql:validation:output'),
  validationError: debug('jagql:validation:error'),
  errors: debug('jagql:errors'),
  requestCounter: debug('jagql:requestCounter'),

  __overrideDebugOutput () {}
}

debugging.__overrideDebugOutput = overrideDebugOutputHelper.bind(null, debugging)
