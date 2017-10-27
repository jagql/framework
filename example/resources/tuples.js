'use strict'

const jsonApi = require('../../.')
const tupleHandler = require('../handlers/tupleHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'tuples',
  description: 'A demonstration of a polymorphic relationship',
  handlers: tupleHandler,
  searchParams: { },
  attributes: {
    media: jsonApi.Joi.many('articles', 'photos'),
    preferred: jsonApi.Joi.one('articles', 'photos')
  },
  examples: [
    {
      id: 1,
      type: 'tuples',
      media: [
        { type: 'articles', id: 4 },
        { type: 'photos', id: 2 }
      ],
      preferred: { type: 'articles', id: 4 }
    },
    {
      id: 2,
      type: 'tuples',
      media: [
        { type: 'articles', id: 3 },
        { type: 'photos', id: 3 }
      ],
      preferred: { type: 'photos', id: 2 }
    }
  ]
})
