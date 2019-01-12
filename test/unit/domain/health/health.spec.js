/* global  describe,it,assert, beforeEach */
import { uptime as proccessUptime } from 'process'
import Health from '../../../../src/domain/health/controller/health'

const health = new Health()

let output = null
describe('Health Domain', () => {
  beforeEach(done => {
    output = new global.Output()
    done()
  })

  it('should return when de system start succsess', done => {
    health
      .uptime(null, output)
      .then(res => {
        const expectedResult = {
          status: 200,
          response: `The system is online since ${new Date(Date.now() - proccessUptime() * 1000)}!`
        }
        assert.deepEqual(res, expectedResult)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
