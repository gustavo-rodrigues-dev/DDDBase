import MiddlewareInterface from '../interfaceMiddleware'
import express from 'express'
import body from '../common/body'
import httpSecurity from '../common/httpSecurity'
import logger from '../common/logger'
import boot from './boot'
import routes from './routes'

class Server extends MiddlewareInterface {
  constructor (config) {
    super()
    this.server = express()
    this.server.set('config', config)
  }

  start () {
    logger(this.server)
    body(this.server)
    httpSecurity(this.server)
    routes(this.server)
    boot(this.server)
  }
}

export default Server
