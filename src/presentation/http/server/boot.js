export default server => {
  server.listen(3001, () => server.logger.info('Start api Customer'))
}
