import config from '../../config/config'
import loggerFactory from '../factories/loggerFactory'
import sequelizeFactory from '../factories/sequelizeFactory'
import BlackListRepository from './blackList'

const appLogger = loggerFactory({
  level: config.level
})

const datasource = sequelizeFactory(config, appLogger)

const blacklistRepository = new BlackListRepository(datasource.models.blackList)

export { blacklistRepository, datasource }
