'use strict'

const jsonApi = require('../../.')
const photoHandler = require('../handlers/photoHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'photos',
  description: 'Used to represent all the images in the system.',
  handlers: photoHandler,
  searchParams: { },
  attributes: {
    title: jsonApi.Joi.string()
      .description('The photos title')
      .example('Summer in the Country'),
    url: jsonApi.Joi.string().uri().required()
      .description('A url that resolves to the photograph')
      .example('http://www.somewhere.com/image.png'),
    height: jsonApi.Joi.number().min(1).max(10000).precision(0)
      .description('The photos height in pixels')
      .example(512),
    width: jsonApi.Joi.number().min(1).max(10000).precision(0)
      .description('The photos width in pixels')
      .example(512),
    raw: jsonApi.Joi.boolean()
      .default(false)
      .description('File in RAW format')
      .example(false),
    tags: jsonApi.Joi.array().items(jsonApi.Joi.string())
      .description('Tags for the photo'),
    photographer: jsonApi.Joi.one('people')
      .description('The person who took the photo'),
    articles: jsonApi.Joi.belongsToMany({
      resource: 'articles',
      as: 'photos'
    })
  },
  examples: [
    {
      id: 1,
      type: 'photos',
      title: 'Matrix Code',
      url: 'http://www.example.com/foobar',
      height: 1080,
      width: 1920,
      raw: true,
      tags: ['neo', 'morpheus'],
      photographer: { type: 'people', id: 4 }
    },
    {
      id: 2,
      type: 'photos',
      title: 'Penguins',
      url: 'http://www.example.com/penguins',
      height: 220,
      width: 60,
      tags: ['galapagos', 'emperor'],
      photographer: { type: 'people', id: 3 }
    },
    {
      id: 3,
      type: 'photos',
      title: 'Cup of Tea',
      url: 'http://www.example.com/treat',
      height: 350,
      width: 350,
      tags: ['black', 'green'],
      photographer: { type: 'people', id: 4 }
    },
    {
      id: 4,
      type: 'photos',
      title: 'Sunset Horizon',
      url: 'http://www.example.com/sunset',
      height: 450,
      width: 1050,
      raw: true,
      tags: ['orange', 'sky', 'sun'],
      photographer: { type: 'people', id: 1 }
    }

  ]
})
