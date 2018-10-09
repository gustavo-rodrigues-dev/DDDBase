import { uptime } from 'os'

class Sayhello {
  static hello (input, output) {
    return output
      .status(200)
      .json(`Hello ${uptime()}!`)
  }
}

module.exports = Sayhello
