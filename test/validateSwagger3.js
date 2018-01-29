const jsonApiTestServer = require('../example/server.js')
const request = require('request')
const assert = require('assert')

describe('validate swagger 3 specs', () => {
  before(() => {
    jsonApiTestServer.start()
  })

  it('should not contain any errors', (done) => {
    const uri = 'http://localhost:16006/rest/swagger.json'

    request(uri, (meh, res, swaggerObject) => {
      let validator = require('swagger2openapi/validate.js')
      let options = {}
      swaggerObject = JSON.parse(swaggerObject)
      validator.validate(swaggerObject, options, (err, options) => {
        if (err) {
          done(err)
        } else {
          // options.valid contains the result of the validation
          // options.context now contains a stack (array) of JSON-Pointer strings
          done()
        }
      })
    })
  })

  after(() => {
    jsonApiTestServer.close()
  })
})
