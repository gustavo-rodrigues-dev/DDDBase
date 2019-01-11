import BaseDatasource from '../common/datasource'
import path from 'path'
class RelationalDatasource extends BaseDatasource {
  constructor (config, logger) {
    super(config, logger)
    const dir = path.join(__dirname, './schemas/')

    this.loadModels(dir)
  }
}

export default RelationalDatasource
