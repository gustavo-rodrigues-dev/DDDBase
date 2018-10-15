/* global  describe,before,beforeEach,afterEach,it,assert */
import { createUser, emptyUsers } from './fixtures/blackList.fixture'
import CheckBlacklist from '../../../src/domain/blacklist/controllers/checkBlacklist'

let output = null
describe('CheckBlacklist Domain ', () => {
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

  it('should retrun a Blocked CPF', done => {
    CheckBlacklist.verify(
      {
        cpf: '58151575034'
      },
      output
    )
      .then(res => {
        const expectedResult = {
          status: 200,
          response: {
            success: true,
            msg: 'CPF is Blocked',
            data: {
              isBlocked: true
            }
          }
        }

        assert.deepEqual(res, expectedResult)

        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should retrun an Unblocked CPF', done => {
    CheckBlacklist.verify(
      {
        cpf: '43460561050'
      },
      output
    )
      .then(res => {
        const expectedResult = {
          status: 200,
          response: {
            success: true,
            data: {
              isBlocked: false
            },
            msg: "CPF isn't Blocked"
          }
        }
        assert.deepEqual(res, expectedResult)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should retrun an Invalid CPF', done => {
    CheckBlacklist.verify(
      {
        cpf: '3423423434'
      },
      output
    )
      .then(res => {
        const expectedResult = {
          status: 412,
          response: {
            success: false,
            data: 'Invalid CPF number',
            msg: 'Error on check blacklist'
          }
        }
        assert.deepEqual(res, expectedResult)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
