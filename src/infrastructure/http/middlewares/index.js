import server from './serverless/'

exports = config => {
  server(config)

  return server
}
