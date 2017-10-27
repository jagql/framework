'use strict'

const assert = require('assert')
const helpers = require('./helpers.js')
const jsonApiTestServer = require('../example/server.js')

describe('Testing jsonapi-server', () => {
  describe('Adding to a relation', () => {
    it('errors with invalid type', done => {
      const data = {
        method: 'post',
        url: 'http://localhost:16006/rest/foobar/someId/relationships/author'
      }
      helpers.request(data, (err, res, json) => {
        assert.equal(err, null)
        helpers.validateError(json)
        assert.equal(res.statusCode, '404', 'Expecting 404')

        done()
      })
    })

    it('errors with invalid id', done => {
      const data = {
        method: 'post',
        url: 'http://localhost:16006/rest/articles/foobar/relationships/author',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        body: JSON.stringify({
          'data': { 'type': 'people', 'id': 4 }
        })
      }
      helpers.request(data, (err, res, json) => {
        assert.equal(err, null)
        helpers.validateError(json)
        assert.equal(res.statusCode, '404', 'Expecting 404')

        done()
      })
    })

    it('errors with invalid type', done => {
      const data = {
        method: 'post',
        url: 'http://localhost:16006/rest/articles/4/relationships/comments',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        body: JSON.stringify({
          'data': { 'type': 'people', 'id': 1 }
        })
      }
      helpers.request(data, (err, res, json) => {
        assert.equal(err, null)
        helpers.validateError(json)
        assert.equal(res.statusCode, '403', 'Expecting 403')

        done()
      })
    })

    describe('adding to a many()', () => {
      it('updates the resource', done => {
        const data = {
          method: 'post',
          url: 'http://localhost:16006/rest/articles/1/relationships/comments',
          headers: {
            'Content-Type': 'application/vnd.api+json'
          },
          body: JSON.stringify({
            'data': { 'type': 'comments', 'id': 1, meta: { 'updated': '2016-01-01' } }
          })
        }
        helpers.request(data, (err, res, json) => {
          assert.equal(err, null)
          helpers.validateJson(json)

          assert.equal(res.statusCode, '201', 'Expecting 201')

          done()
        })
      })

      it('new resource has changed', done => {
        const url = 'http://localhost:16006/rest/articles/1/relationships/comments'
        helpers.request({
          method: 'GET',
          url
        }, (err, res, json) => {
          assert.equal(err, null)
          json = helpers.validateJson(json)

          assert.equal(res.statusCode, '200', 'Expecting 200')

          assert.deepEqual(json.data, [
            {
              'type': 'comments',
              'id': 2
            },
            {
              'type': 'comments',
              'id': 1,
              'meta': {
                'updated': '2016-01-01'
              }
            }
          ])

          done()
        })
      })
    })

    describe('adding to a one()', () => {
      it('updates the resource', done => {
        const data = {
          method: 'post',
          url: 'http://localhost:16006/rest/articles/4/relationships/author',
          headers: {
            'Content-Type': 'application/vnd.api+json'
          },
          body: JSON.stringify({
            'data': { 'type': 'people', 'id': 1 }
          })
        }
        helpers.request(data, (err, res, json) => {
          assert.equal(err, null)
          helpers.validateJson(json)

          assert.equal(res.statusCode, '201', 'Expecting 201')

          done()
        })
      })

      it('new resource has changed', done => {
        const url = 'http://localhost:16006/rest/articles/4/relationships/author'
        helpers.request({
          method: 'GET',
          url
        }, (err, res, json) => {
          assert.equal(err, null)
          json = helpers.validateJson(json)

          assert.equal(res.statusCode, '200', 'Expecting 200')

          assert.deepEqual(json.data, {
            'type': 'people',
            'id': 1
          })

          done()
        })
      })
    })
  })

  before(() => {
    jsonApiTestServer.start()
  })
  after(() => {
    jsonApiTestServer.close()
  })
})
