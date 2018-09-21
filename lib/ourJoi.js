'use strict'
const ourJoi = module.exports = { }

const Joi = require('joi')
const JoiDateExtensions = require('joi-date-extensions')
Joi.extend(JoiDateExtensions)

ourJoi._joiBase = resourceName => {
  const relationType = Joi.object().keys({
    id: Joi.string().required(),
    type: Joi.any().required().valid(resourceName),
    meta: Joi.object().optional()
  })
  return relationType
}
Joi.one = function () {
  const resources = Array.prototype.slice.call(arguments)
  resources.forEach(resource => {
    if (typeof resource !== 'string') throw new Error('Expected a string when defining a primary relation via .one()')
  })
  const obj = Joi.alternatives().try([
    Joi.any().valid(null) // null
  ].concat(resources.map(ourJoi._joiBase)))
  obj._settings = {
    __one: resources
  }
  obj._settings._uidType = 'string'
  obj.uidType = function (keyType) {
    if (keyType !== 'uuid' && keyType !== 'autoincrement' && keyType !== 'string') {
      throw new Error('Resources can be related only via UUID or AUTOINCREMENT keys')
    }
    obj._settings._uidType = keyType
    return obj
  }
  return obj
}
Joi.many = function () {
  const resources = Array.prototype.slice.call(arguments)
  resources.forEach(resource => {
    if (typeof resource !== 'string') throw new Error('Expected a string when defining a primary relation via .many()')
  })
  const obj = Joi.array().items(resources.map(ourJoi._joiBase))
  obj._settings = {
    __many: resources
  }
  obj._settings._uidType = 'string'
  obj.uidType = function (keyType) {
    if (keyType !== 'uuid' && keyType !== 'autoincrement') {
      throw new Error('Resources can be related only via UUID or AUTOINCREMENT keys')
    }
    obj._settings._uidType = keyType
    return obj
  }
  return obj
}
Joi._validateForeignRelation = config => {
  if (!config.as) throw new Error("Missing 'as' property when defining a foreign relation")
  if (!config.resource) throw new Error("Missing 'resource' property when defining a foreign relation")
}
Joi.belongsToOne = config => {
  Joi._validateForeignRelation(config)
  const obj = Joi.alternatives().try(
    Joi.any().valid(null), // null
    ourJoi._joiBase(config.resource)
  )
  obj._settings = {
    __one: [ config.resource ],
    __as: config.as
  }
  return obj
}
Joi.belongsToMany = config => {
  Joi._validateForeignRelation(config)
  const obj = Joi.array().items(ourJoi._joiBase(config.resource))
  obj._settings = {
    __many: [ config.resource ],
    __as: config.as
  }
  return obj
}
/**
 * Send a config of the format -
 * <pre>
 *   {
 *    params: {username: jsonApi.Joi.string(), password: jsonApi.Joi.string()},
 *    get () {},
 *    post () {}
 *   }
 * </pre>
 */
Joi.action = config => {
  if (!(config.get && typeof config.get === 'function')) {
    throw new Error("'get' has to be a function")
  }
  if (!(config.post && typeof config.post === 'function')) {
    throw new Error("'post' has to be a function")
  }
  const obj = Joi.func()
  obj._settings = {
    _action: config
  }
  return obj
}
ourJoi.Joi = Joi
