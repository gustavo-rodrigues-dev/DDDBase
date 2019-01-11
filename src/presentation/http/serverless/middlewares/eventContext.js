import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'

export default app => {
  app.use(awsServerlessExpressMiddleware.eventContext())

  return app
}
