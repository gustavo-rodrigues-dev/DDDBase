import { uptime as proccessUptime } from 'process'
import { store } from '../../../infrastructure/repositories/index'
import Controller from '../../common/controller'

class Health extends Controller {
  async uptime (input, output) {
    try {
      await Promise.all(Object.values(store.getDatasources('relational').datasources).map(datasource => {
        datasource.instanceDriver.authenticate()
      }))
      return output
        .status(200)
        .send(`The system is online since ${new Date(Date.now() - proccessUptime() * 1000)}!`)
    } catch (e) {
      return output.status(500).send(`The system is unavailable`)
    }
  }
}

export default Health
