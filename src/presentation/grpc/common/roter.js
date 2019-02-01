import config from '../../../config/config'
import loggerFactory from '../../../lib/logger'
class Router {
  constructor () {
    this.logger = loggerFactory({
      level: config.level
    })
  }
}

export default Router
