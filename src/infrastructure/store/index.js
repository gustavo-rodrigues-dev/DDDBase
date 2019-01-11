import RelationalDataSources from './relational'

class Store {
  constructor (config, logger) {
    this.dataSources = {}
    this.loadDataSources(config, logger)
  }

  loadDataSources (datasources, logger) {
    this.dataSources.relational = new RelationalDataSources(datasources.relational, logger)
  }

  getDatasource (type, name) {
    return this.dataSources[type].getDataSource(name)
  }

  getDatasources (type) {
    return this.dataSources[type]
  }
}

export default Store
