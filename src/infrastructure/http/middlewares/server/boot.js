export default (app) => {
  app.listen(app.config.port, () => app.logger.info(`Start api Customer at ${app.config.port}`))
}
