import express from 'express'
import body from '../common/body'
import httpSecurity from '../common/httpSecurity'
import logger from '../common/logger'
import routes from './routes'
import eventContext from './middlewares/eventContext'
import awsServerlessExpress from 'aws-serverless-express'
export default config => {
  const app = express()
  app.set('config', config)
  body(app)
  httpSecurity(app)
  logger(app)
  eventContext(app)
  routes(app)

  const server = awsServerlessExpress.createServer(app)
  return server
}
