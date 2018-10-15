import assert from 'assert'
import supertest from 'supertest'
import app from '../src/index'
import sequelizeFactory from '../src/infrastructure/factories/sequelizeFactory'

class Output {
  status (num) {
    this.status = num
    return this
  }
  json (msg) {
    this.response = msg
    return this
  }
  send (msg) {
    this.response = msg
    return this
  }
  sendStatus (num) {
    this.status = num
    this.response = undefined

    return this
  }
}

global.app = app
global.Output = Output
global.config = app.get('config')
global.datasource = sequelizeFactory(global.config, app.logger)
global.assert = assert
global.request = supertest(app)
