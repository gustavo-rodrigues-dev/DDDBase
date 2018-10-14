class MissingArgument extends Error {
  constructor (...params) {
    super(...params)

    this.type = 'MISSINGARGUMENT'
    this.local = 'DEFAULT'
    this.statusCode = 412
  }

  getStatus () {
    return this.statusCode
  }
}

export default MissingArgument
