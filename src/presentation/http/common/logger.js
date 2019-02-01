import LoggerFactory from '../../../lib/logger'

export default server => {
  const config = server.get('config').debug
  server.logger = LoggerFactory({
    level: config.level
  })

  return server
}
