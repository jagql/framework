'use strict'

const jsonApi = require('../../.')
const peopleHandler = require('../handlers/peopleHandler.js')

jsonApi.define({
  namespace: 'json:api',
  resource: 'people',
  description: 'Used to attribute work to specific people.',
  handlers: peopleHandler,
  searchParams: { },
  attributes: {
    firstname: jsonApi.Joi.string().alphanum()
      .description('The persons first name')
      .example('John'),
    lastname: jsonApi.Joi.string().alphanum()
      .description('The persons last name')
      .example('Smith'),
    email: jsonApi.Joi.string().email()
      .description('The persons preferred contact email address')
      .example('john.smith@gmail.com'),
    articles: jsonApi.Joi.belongsToMany({
      resource: 'articles',
      as: 'author'
    }),
    photos: jsonApi.Joi.belongsToMany({
      resource: 'photos',
      as: 'photographer'
    })
  },
  examples: [
    {
      id: 1,
      type: 'people',
      firstname: 'Oli',
      lastname: 'Rumbelow',
      email: 'oliver.rumbelow@example.com'
    },
    {
      id: 2,
      type: 'people',
      firstname: 'Pedro',
      lastname: 'Romano',
      email: 'pedro.romano@example.com'
    },
    {
      id: 3,
      type: 'people',
      firstname: 'Mark',
      lastname: 'Fermor',
      email: 'mark.fermor@example.com'
    },
    {
      id: 4,
      type: 'people',
      firstname: 'Rahul',
      lastname: 'Patel',
      email: 'rahul.patel@example.com'
    }
  ]
})
