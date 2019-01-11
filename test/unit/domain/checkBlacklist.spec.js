/* global  describe,before,beforeEach,afterEach,it,assert */
import { createUser, emptyUsers } from './fixtures/blackList.fixture'
import CheckBlacklist from '../../../src/domain/blacklist/controllers/checkBlacklist'
const checkBlacklist = new CheckBlacklist()
let output = null

describe('CheckBlacklist Domain ', () => {
  before(done => {
    global.store.getDatasource('relational', 'blacklist').instanceDriver.sync().then(() => {
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
    checkBlacklist
      .verify(
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
    checkBlacklist
      .verify(
        {
          cpf: '37538654860'
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
    checkBlacklist
      .verify(
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
