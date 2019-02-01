import config from '../../config/config'
import loggerFactory from '../../lib/logger'
class Controller {
  constructor () {
    this.logger = loggerFactory({
      level: config.level
    })
  }
}

export default Controller
