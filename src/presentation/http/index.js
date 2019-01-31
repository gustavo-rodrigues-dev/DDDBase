import server from './server/'

exports = config => {
  server(config)

  return server
}
