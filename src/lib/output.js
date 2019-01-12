class Output {
  status (num) {
    this.status = num
    return this
  }
  json (msg) {
    this.response = msg
    return this
  }
  send (msg) {
    this.response = msg
    return this
  }
  sendStatus (num) {
    this.status = num
    this.response = undefined

    return this
  }
}

export default Output
