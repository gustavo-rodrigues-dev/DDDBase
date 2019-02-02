import config from '../../config'
import loggerFactory from '../../lib/logger'
class Controller {
  constructor () {
    this.logger = loggerFactory({
      level: config.debug.level
    })
  }
}

export default Controller
