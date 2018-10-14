import LoggerFactory from '../../../factories/loggerFactory'

export default server => {
  const config = server.get('config').debug
  server.logger = LoggerFactory({
    level: config.level
  })
}
