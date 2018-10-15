/* global  describe,before,beforeEach,afterEach,it,assert */
import { createUser, emptyUsers } from './fixtures/blackList.fixture'
import RemoveBlacklist from '../../../src/domain/blacklist/controllers/removeBlacklist'

let output = null
describe('RemoveBlacklist Domain ', () => {
  before(done => {
    global.datasource.sequelize.sync().then(() => {
      done()
    })
  })

  beforeEach(done => {
    output = new global.Output()
    createUser().then(user => {
      done()
    })
  })

  afterEach(done => {
    emptyUsers().then(() => done())
  })

  it('should Delete a valid CPF', done => {
    RemoveBlacklist.delete(
      {
        cpf: '58151575034'
      },
      output
    )
      .then(res => {
        const expectedResult = {
          status: 204,
          response: undefined
        }

        assert.deepEqual(res, expectedResult)

        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should Delete an invalid CPF', done => {
    RemoveBlacklist.delete(
      {
        cpf: '2112345324534'
      },
      output
    )
      .then(res => {
        const expectedResult = {
          status: 204,
          response: undefined
        }

        assert.deepEqual(res, expectedResult)

        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
