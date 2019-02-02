import config from '../../../config'
import loggerFactory from '../../../lib/logger'
class Router {
  constructor () {
    this.logger = loggerFactory({
      level: config.debug.level
    })
  }
}

export default Router
