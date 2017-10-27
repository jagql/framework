'use strict'

const assert = require('assert')
const jsonApiTestServer = require('../example/server')

const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const client = new Lokka({
  transport: new Transport('http://localhost:16006/rest/')
})

describe('Testing jsonapi-server graphql', () => {
  describe('read operations', () => {
    it('filter with primary join and filter', () => client.query(`
      {
        photos(width: "<1000") {
          url
          width
          tags
          photographer(firstname: "Rahul") {
            firstname
          }
        }
      }
    `).then(result => {
      assert.deepEqual(result, {
        'photos': [
          {
            'url': 'http://www.example.com/penguins',
            'width': 60,
            'tags': ['galapagos', 'emperor'],
            'photographer': null
          },
          {
            'url': 'http://www.example.com/treat',
            'width': 350,
            'tags': ['black', 'green'],
            'photographer': {
              'firstname': 'Rahul'
            }
          }
        ]
      })
    }))

    it('filter with foreign join and filter', () => client.query(`
      {
        people(firstname: "Rahul") {
          firstname
          photos(width: "<1000") {
            url
            width
          }
        }
      }
    `).then(result => {
      assert.deepEqual(result, {
        'people': [
          {
            'firstname': 'Rahul',
            'photos': [
              {
                'url': 'http://www.example.com/treat',
                'width': 350
              }
            ]
          }
        ]
      })
    }))
  })

  describe('write operations', () => {
    let tagId = null

    it('create a tag', () => client.mutate(`
      {
        createTags(tags: {
          name: "test1"
          parent: {
            id: 1
          }
        }) {
          id
          name
          parent {
            id
            name
          }
        }
      }
    `).then(result => {
      assert.equal(result.createTags.name, 'test1')
      assert.equal(result.createTags.parent.id, 1)
      assert.equal(result.createTags.parent.name, 'live')
      tagId = result.createTags.id
    }))

    it('update the new tag', () => client.mutate(`
      {
        updateTags(tags: {
          id: "${tagId}"
          name: "test2"
          parent: {
            id: 4
          }
        }) {
          id
          name
          parent {
            id
            name
          }
        }
      }
    `).then(result => {
      assert.deepEqual(result, {
        updateTags: {
          id: tagId,
          name: 'test2',
          parent: {
            id: 4,
            name: 'development'
          }
        }
      })
    }))

    it('deletes the tag', () => client.mutate(`
      {
        deleteTags(id: "${tagId}") {
          name
        }
      }
    `).then(result => {
      assert.deepEqual(result, {
        'deleteTags': {
          'name': 'test2'
        }
      })
    }))

    it('really is gone', () => client.query(`
      {
        tags(id: "${tagId}") {
          name
        }
      }
    `).then(result => {
      assert.deepEqual(result, {
        'tags': [ ]
      })
    }))
  })

  before(() => {
    jsonApiTestServer.start()
  })
  after(() => {
    jsonApiTestServer.close()
  })
})
