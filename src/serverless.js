import config from './config/config'
import App from './infrastructure/http/middlewares/serverless/index'
import awsServerlessExpress from 'aws-serverless-express'
const server = App(config)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
