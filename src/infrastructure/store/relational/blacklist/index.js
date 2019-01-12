import BaseDatasource from '../common/datasource'
import path from 'path'
class RelationalDatasource extends BaseDatasource {
  constructor (config, logger) {
    config.dirModels = path.join(__dirname, './schemas/')
    super(config, logger)
    this.loadModels(config.dirModels)
  }
}

export default RelationalDatasource
