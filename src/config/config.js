const config = require(`./config.${process.env.NODE_ENV || 'development'}.js`)

export default (app) => {
  app.config = config

  return app
}
