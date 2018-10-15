import { uptime as proccessUptime } from 'process'
class Health {
  static async uptime (input, output) {
    try {
      return output
        .status(200)
        .send(`The system is online since ${new Date(Date.now() - proccessUptime() * 1000)}!`)
    } catch (e) {
      console.log(e)
      return utput.status(500).send(`The system is unavailable`)
    }
  }
}

export default Health
