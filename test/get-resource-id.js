'use strict'

const assert = require('assert')
const helpers = require('./helpers.js')
const request = require('request')
const jsonApiTestServer = require('../example/server.js')

describe('Testing jsonapi-server', () => {
  describe('Finding a specific resource', () => {
    it('unknown id should error', done => {
      const url = 'http://localhost:16006/rest/articles/foobar'
      helpers.request({
        method: 'GET',
        url
      }, (err, res, json) => {
        assert.equal(err, null)
        helpers.validateError(json)
        assert.equal(res.statusCode, '404', 'Expecting 404')
        done()
      })
    })

    it('valid lookup', done => {
      const url = 'http://localhost:16006/rest/articles/1'
      helpers.request({
        method: 'GET',
        url
      }, (err, res, json) => {
        assert.equal(err, null)
        json = helpers.validateJson(json)

        assert.equal(res.statusCode, '200', 'Expecting 200 OK')
        assert.equal(json.included.length, 0, 'Should be no included resources')
        helpers.validateResource(json.data)

        done()
      })
    })

    it('with fields', done => {
      const url = 'http://localhost:16006/rest/articles/1?fields[articles]=title'
      request({
        method: 'GET',
        url
      }, (err, res, json) => {
        assert.equal(err, null)
        json = helpers.validateJson(json)

        assert.equal(res.statusCode, '200', 'Expecting 200 OK')
        helpers.validateResource(json.data)
        const keys = Object.keys(json.data.attributes)
        assert.deepEqual(keys, [ 'title' ], 'Should only contain title attribute')

        done()
      })
    })

    it('with filter', done => {
      const url = 'http://localhost:16006/rest/articles/1?filter[title]=title'
      helpers.request({
        method: 'GET',
        url
      }, (err, res, json) => {
        assert.equal(err, null)
        json = helpers.validateJson(json)

        assert.equal(res.statusCode, '200', 'Expecting 200 OK')
        assert.deepEqual(json.data, null)

        done()
      })
    })

    describe('with includes', () => {
      it('basic include', done => {
        const url = 'http://localhost:16006/rest/articles/1?include=author'
        helpers.request({
          method: 'GET',
          url
        }, (err, res, json) => {
          assert.equal(err, null)
          json = helpers.validateJson(json)

          assert.equal(res.statusCode, '200', 'Expecting 200 OK')
          assert.equal(json.included.length, 1, 'Should be 1 included resource')

          const people = json.included.filter(resource => resource.type === 'people')
          assert.equal(people.length, 1, 'Should be 1 included people resource')

          done()
        })
      })

      it('including over a null relation', done => {
        const url = 'http://localhost:16006/rest/tags/5?include=parent'
        helpers.request({
          method: 'GET',
          url
        }, (err, res, json) => {
          assert.equal(err, null)
          json = helpers.validateJson(json)

          assert.equal(res.statusCode, '200', 'Expecting 200 OK')
          assert.equal(json.included.length, 0, 'Should be 0 included resources')
          done()
        })
      })
    })

    describe('with recursive includes', () => {
      it('works with a manually expanded string', done => {
        const url = 'http://localhost:16006/rest/tags/1?include=parent.parent.parent.parent.articles'
        helpers.request({
          method: 'GET',
          url
        }, (err, res, json) => {
          assert.equal(err, null)
          json = helpers.validateJson(json)

          assert.equal(res.statusCode, '200', 'Expecting 200 OK')
          assert.equal(json.included.length, 5, 'Should be 5 included resources')
          assert.equal(json.included[4].type, 'articles', 'Last include should be an article')
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
