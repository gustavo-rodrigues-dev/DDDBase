import { createLogger, transports } from 'winston'

export default (app) => {
  const debugTransports = [
    new (transports.Console)({
      colorize: true
    })
  ]

  const logger = createLogger({
    level: app.config.debug.level,
    transports: debugTransports
  })

  return logger
}
