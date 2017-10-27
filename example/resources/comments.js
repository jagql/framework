'use strict'

const jsonApi = require('../../.')
const commentHandler = require('../handlers/commentHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'comments',
  description: 'Allow people to attach short messages to articles',
  handlers: commentHandler,
  searchParams: { },
  attributes: {
    body: jsonApi.Joi.string().required()
      .description('The tag name')
      .example('Summer'),
    timestamp: jsonApi.Joi.string().regex(/^[12]\d\d\d-[01]\d-[0123]\d$/)
      .description('The date on which the comment was created, YYYY-MM-DD')
      .example('2017-05-01'),
    author: jsonApi.Joi.one('people')
      .description('The person who wrote the comment'),
    article: jsonApi.Joi.belongsToOne({
      resource: 'articles',
      as: 'comments'
    })
  },
  examples: [
    {
      id: 1,
      type: 'comments',
      body: 'First!',
      timestamp: '2017-01-02',
      author: { type: 'people', id: 4 }
    },
    {
      id: 2,
      type: 'comments',
      body: 'I like XML better',
      timestamp: '2017-06-20',
      author: { type: 'people', id: 2, meta: { created: '2010-01-01' } }
    },
    {
      id: 3,
      type: 'comments',
      body: 'Wibble wibble.',
      timestamp: '2017-12-31',
      author: null
    }
  ]
})
