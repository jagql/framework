'use strict'

const jsonApi = require('../../.')
const tagHandler = require('../handlers/tagHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'tags',
  description: 'Used to group resources together, useful for finding related resources.',
  handlers: tagHandler,
  searchParams: { },
  attributes: {
    name: jsonApi.Joi.string()
      .description('The tag name')
      .example('Summer'),
    articles: jsonApi.Joi.belongsToMany({
      resource: 'articles',
      as: 'tags'
    }),
    parent: jsonApi.Joi.one('tags'),
    children: jsonApi.Joi.belongsToMany({
      resource: 'tags',
      as: 'parent'
    })
  },
  examples: [
    {
      id: 1,
      type: 'tags',
      name: 'live',
      parent: { type: 'tags', id: 2 }
    },
    {
      id: 2,
      type: 'tags',
      name: 'staging',
      parent: { type: 'tags', id: 3 }
    },
    {
      id: 3,
      type: 'tags',
      name: 'building',
      parent: { type: 'tags', id: 4 }
    },
    {
      id: 4,
      type: 'tags',
      name: 'development',
      parent: { type: 'tags', id: 5 }
    },
    {
      id: 5,
      type: 'tags',
      name: 'planning',
      parent: null
    }
  ]
})
