'use strict'

const jsonApi = require('../../.')
const articleHandler = require('../handlers/articleHandler.js')
const timestampHandler = require('../handlers/timestampHandler.js')
const authenticationHandler = require('../handlers/authenticationHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'articles',
  description: 'Represents the core content, people love to read articles.',
  handlers: authenticationHandler.chain(timestampHandler).chain(articleHandler),
  searchParams: {
    query: jsonApi.Joi.number()
      .description('Fuzzy text match against titles')
      .example(123)
  },
  attributes: {
    title: jsonApi.Joi.string().required()
      .description('The articles title, should be between 8 and 15 words')
      .example('Learning how to use JSON:API'),
    content: jsonApi.Joi.string().required()
      .description('The main body of the article, provided as HTML')
      .example('<p>Paragraph 1. Lovely.</p><hr /><p>The End.</p>'),
    created: jsonApi.Joi.string().regex(/^[12]\d\d\d-[01]\d-[0123]\d$/)
      .description('The date on which the article was created, YYYY-MM-DD')
      .example('2017-05-01'),
    status: jsonApi.Joi.string().default('published')
      .description('The status of the article - draft, ready, published')
      .example('published'),
    views: jsonApi.Joi.number().default(0)
      .description('Number of views for this article'),
    author: jsonApi.Joi.one('people')
      .description('The person who wrote the article'),
    tags: jsonApi.Joi.many('tags')
      .description('All of the tags associated with an article'),
    photos: jsonApi.Joi.many('photos')
      .description('List of all the photos included in an article'),
    comments: jsonApi.Joi.many('comments')
      .description('All of the comments posted on this article')
  },
  examples: [
    {
      id: 1,
      type: 'articles',
      title: 'NodeJS Best Practices',
      content: 'na',
      created: '2016-01-05',
      views: 10,
      author: {
        type: 'people',
        id: 1,
        meta: { updated: '2010-11-06' }
      },
      tags: [
        { type: 'tags', id: 1 }
      ],
      photos: [ ],
      comments: [
        { type: 'comments', id: 2 }
      ],
      meta: {
        updated: '2011-05-10'
      }
    },
    {
      id: 2,
      type: 'articles',
      title: 'Linux Rocks',
      content: 'na',
      created: '2015-11-11',
      views: 20,
      author: { type: 'people', id: 3 },
      tags: [
        { type: 'tags', id: 2 }
      ],
      photos: [
        { type: 'photos', id: 1 },
        { type: 'photos', id: 2 }
      ],
      comments: [ ]
    },
    {
      id: 3,
      type: 'articles',
      title: 'How to AWS',
      content: 'na',
      created: '2016-02-08',
      views: 30,
      author: { type: 'people', id: 2 },
      tags: [
        { type: 'tags', id: 5 }
      ],
      photos: [
        { type: 'photos', id: 1 }
      ],
      comments: [ ]
    },
    {
      id: 4,
      type: 'articles',
      title: 'Tea for Beginners',
      content: 'na',
      created: '2015-06-23',
      views: 40,
      author: { type: 'people', id: 4 },
      tags: [
        { type: 'tags', id: 3 },
        { type: 'tags', id: 1 }
      ],
      photos: [
        { type: 'photos', id: 3 }
      ],
      comments: [
        { type: 'comments', id: 1 }
      ]
    }
  ]
})
