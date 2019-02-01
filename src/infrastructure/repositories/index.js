import config from '../../config/config'
import loggerFactory from '../../lib/logger'
import BlackListRepository from './blackList'
import Store from '../store/'

const appLogger = loggerFactory({
  level: config.debug.level
})

const store = new Store(config.db, appLogger)
const blacklistRepository = new BlackListRepository({
  relational: store.getDatasource('relational', 'blacklist').getModel('blackList')
})

export { store, blacklistRepository }
