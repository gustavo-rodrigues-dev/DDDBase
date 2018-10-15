/* global  describe,before,beforeEach,afterEach,it,assert */
import { createUser, emptyUsers } from './fixtures/blackList.fixture'
import AddBlackList from '../../../src/domain/blacklist/controllers/addBlackList'

let output = null
describe('AddBlackList Domain', () => {
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

  it('should add a CPF to a database', done => {
    AddBlackList.add(
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

  it('should invalid CPF', done => {
    AddBlackList.add(
      {
        cpf: '897245892347954523'
      },
      output
    )
      .then(res => {
        const expectedResult = {
          status: 500,
          response: {
            success: false,
            data: 'Validation error: invalid CPF number',
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
