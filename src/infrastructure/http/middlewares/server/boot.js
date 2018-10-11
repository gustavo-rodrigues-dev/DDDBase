export default server => {
  server.listen(3000, () => server.logger.info('Start api Customer'))
}
