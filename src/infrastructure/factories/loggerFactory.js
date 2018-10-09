import { createLogger, transports } from 'winston'

export default (app) => {
  const debugTransports = [
    new (transports.Console)({
      colorize: true
    })
  ]

  app.logger = createLogger({
    level: app.config.debug.level,
    transports: debugTransports
  })

  return app
}
