import express from 'express'
import config from '../../../../config/config'
import body from '../common/body'
import httpSecurity from '../common/httpSecurity'
import boot from './boot'
import logger from '../../../factories/loggerFactory'
import routes from './routes'

const app = express()
config(app)
logger(app)
body(app)
httpSecurity(app)
routes(app)
boot(app)

export default app
