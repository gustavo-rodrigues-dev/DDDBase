/* global  describe,before,beforeEach,afterEach,it,request,assert */
import { createUser, emptyUsers } from '../fixtures/blackList.fixture'

describe('Black list route', () => {
  before(done => {
    global.datasource.sequelize.sync().then(() => {
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
    request
      .get('/blacklist/58151575031')
      .expect(412)
      .end((err, res) => {
        const expectedResult = {
          success: false,
          msg: 'Error on check blacklist',
          data: 'Invalid CPF number'
        }

        assert.deepEqual(res.body, expectedResult)
        done(err)
      })
  })

  it('should return a missing CPF on Check', done => {
    request
      .get('/blacklist')
      .expect(412)
      .end((err, res) => {
        const expectedResult = {
          success: false,
          msg: 'Error on check blacklist',
          data: 'Missing CPF number'
        }

        assert.deepEqual(res.body, expectedResult)
        done(err)
      })
  })

  it('should return an Unblocked CPF on Check', done => {
    request
      .get('/blacklist/60531537021')
      .expect(200)
      .end((err, res) => {
        const expectedResult = {
          success: true,
          msg: "CPF isn't Blocked",
          data: {
            isBlocked: false
          }
        }

        assert.deepEqual(res.body, expectedResult)
        done(err)
      })
  })

  it('should return a Blocked CPF on Check', done => {
    request
      .get('/blacklist/58151575034')
      .expect(200)
      .end((err, res) => {
        const expectedResult = {
          success: true,
          msg: 'CPF is Blocked',
          data: {
            isBlocked: true
          }
        }

        assert.deepEqual(res.body, expectedResult)
        done(err)
      })
  })

  it('should return a success on Block CPF', done => {
    request
      .post('/blacklist')
      .send({
        cpf: '11675526010'
      })
      .expect(200)
      .end((err, res) => {
        const expectedResult = {
          success: true,
          msg: 'Saved successfully',
          data: '116.755.260-10'
        }

        assert.deepEqual(res.body, expectedResult)
        done(err)
      })
  })

  it('should return a success on Block CPF but dont duplicate', done => {
    request
      .post('/blacklist')
      .send({
        cpf: '58151575034'
      })
      .expect(301)
      .end((err, res) => {
        const expectedResult = {
          success: true,
          msg: 'Saved successfully',
          data: '581.515.750-34'
        }

        assert.deepEqual(res.body, expectedResult)
        done(err)
      })
  })
})
