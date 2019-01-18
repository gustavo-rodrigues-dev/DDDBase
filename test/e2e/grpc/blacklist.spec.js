/* global  describe,before,beforeEach,afterEach,it,assert */
import { createUser, emptyUsers } from '../fixtures/blackList.fixture'

describe('Black list service', () => {
  before(done => {
    global.store.getDatasource('relational', 'blacklist').instanceDriver.sync().then(() => {
      done()
    })
  })

  beforeEach(done => {
    createUser().then(user => {
      done()
    })
  })

  afterEach(done => {
    emptyUsers().then(() => done())
  })

  it('should return an invalid CPF on Check', done => {
    const call = global.grpcCLient.checkBlacklist({
      cpf: '58151575031'
    })
    call.on('data', res => {
      const expectedResult = {
        status: 412,
        response: {
          success: false,
          msg: 'Error on check blacklist',
          detail: 'Invalid CPF number'
        }
      }
      assert.deepEqual(res, expectedResult)
      done()
    })

    call.on('error', err => {
      done(err)
    })
  })

  it('should return a missing CPF on Check', done => {
    const call = global.grpcCLient.checkBlacklist({
      cpf: ''
    })
    call.on('data', res => {
      const expectedResult = {
        status: 412,
        response: {
          success: false,
          msg: 'Error on check blacklist',
          detail: 'Missing CPF number'
        }
      }
      assert.deepEqual(res, expectedResult)
      done()
    })

    call.on('error', err => {
      done(err)
    })
  })

  it('should return an Unblocked CPF on Check', done => {
    const call = global.grpcCLient.checkBlacklist({
      cpf: '60531537021'
    })
    call.on('data', res => {
      const expectedResult = {
        status: 200,
        response: {
          success: true,
          msg: "CPF isn't Blocked",
          data: {
            isBlocked: false
          }
        }
      }
      assert.deepEqual(res, expectedResult)
      done()
    })

    call.on('error', err => {
      done(err)
    })
  })

  it('should return a Blocked CPF on Check', done => {
    const call = global.grpcCLient.checkBlacklist({
      cpf: '58151575034'
    })
    call.on('data', res => {
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

    call.on('error', err => {
      done(err)
    })
  })

  it('should return a success on Block CPF', done => {
    const call = global.grpcCLient.addBlackList({
      cpf: '26918759035'
    })
    call.on('data', res => {
      const expectedResult = {
        status: 202,
        response: {
          success: true,
          msg: 'Saved successfully',
          data: '269.187.590-35'
        }
      }
      assert.deepEqual(res, expectedResult)
      done()
    })

    call.on('error', err => {
      done(err)
    })
  })

  it('should return a success on Block CPF but dont duplicate', done => {
    const call = global.grpcCLient.addBlackList({
      cpf: '58151575034'
    })
    call.on('data', res => {
      const expectedResult = {
        status: 202,
        response: {
          success: true,
          msg: 'Saved successfully',
          data: '581.515.750-34'
        }
      }
      assert.deepEqual(res, expectedResult)
      done()
    })

    call.on('error', err => {
      done(err)
    })
  })
})
