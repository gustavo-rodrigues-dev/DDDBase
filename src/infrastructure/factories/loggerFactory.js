import { createLogger, transports } from 'winston'

class Logger {
  constructor (config) {
    const debugTransports = [
      new transports.Console({
        colorize: true
      })
    ]

    Object.assign(
      this,
      createLogger({
        level: config.level,
        transports: debugTransports
      })
    )
  }
}
export default config => {
  return new Logger(config)
}
