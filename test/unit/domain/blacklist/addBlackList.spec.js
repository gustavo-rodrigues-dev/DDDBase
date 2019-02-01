/* global  describe,before,beforeEach,afterEach,it,assert */
import { createUser, emptyUsers } from './fixtures/blackList.fixture'
import AddBlackList from '../../../../src/domain/blacklist/controllers/addBlackList'
const addBlackList = new AddBlackList()

let output = null
describe('UNIT - Blacklist - AddBlackList', () => {
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

  it('should add a CPF to a database', done => {
    addBlackList
      .add(
        {
          cpf: '43460561050'
        },
        output
      )
      .then(res => {
        const expectedResult = {
          status: 201,
          response: {
            success: true,
            msg: 'Saved successfully',
            data: '434.605.610-50'
          }
        }

        assert.deepEqual(res, expectedResult)

        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should return a success on Block CPF but dont duplicate', done => {
    addBlackList
      .add(
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
            msg: 'Saved successfully',
            data: '581.515.750-34'
          }
        }

        assert.deepEqual(res, expectedResult)

        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should invalid CPF', done => {
    addBlackList
      .add(
        {
          cpf: '897245892347954523'
        },
        output
      )
      .then(res => {
        const expectedResult = {
          status: 412,
          response: {
            success: false,
            detail: 'Invalid CPF number',
            msg: 'Error on save blacklist'
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
