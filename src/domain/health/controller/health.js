import { uptime as proccessUptime } from 'process'

class Health {
  static uptime (input, output) {
    return output
      .status(200)
      .json(`UpTime: ${new Date(Date.now() - (proccessUptime() * 1000))}!`)
  }
}

module.exports = Health
