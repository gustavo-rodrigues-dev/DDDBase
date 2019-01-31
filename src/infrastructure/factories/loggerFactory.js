import { createLogger, transports } from 'winston'
class Logger extends createLogger {
  constructor (config) {
    const debugTransports = [
      new transports.Console({
        colorize: true
      })
    ]
    super({
      level: config.level,
      json: true,
      transports: debugTransports
    })
  }
}

export default config => {
  return new Logger(config)
}
