import express from 'express'
import body from '../common/body'
import httpSecurity from '../common/httpSecurity'
import logger from '../common/logger'
import routes from './routes'
import boot from './boot'

module.exports = config => {
  const server = express()
  server.set('config', config)
  body(server)
  httpSecurity(server)
  logger(server)
  routes(server)
  boot(server)

  return server
}
