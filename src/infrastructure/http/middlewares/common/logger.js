import LoggerFactory from '../../../factories/loggerFactory'

export default server => {
  const config = server.get('config').debug

  console.log(config)
  server.logger = LoggerFactory({
    level: config.level
  })
}
