class InvalidArgument extends Error {
  constructor (...params) {
    super(...params)

    this.type = 'INVALIDARGUMENT'
    this.local = 'DEFAULT'
    this.statusCode = 412
  }
}

export default InvalidArgument
