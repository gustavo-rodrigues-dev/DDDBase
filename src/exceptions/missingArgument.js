class MissingArgument extends Error {
  constructor (...params) {
    super(...params)

    this.type = 'MISSINGARGUMENT'
    this.local = 'DEFAULT'
    this.statusCode = 412
  }
}

export default MissingArgument
