import path from 'path'

class Relational {
  constructor (resources, logger) {
    this.datasources = {}
    this.loadDataSources(resources, logger)
  }

  loadDataSources (resources, logger) {
    if (!Array.isArray(resources)) {
      resources = [resources]
    }

    resources.forEach(resource => {
      const LoadSource = require(path.join(__dirname, `./${resource.database}/index`)).default
      if (LoadSource) {
        this.datasources[resource.database] = new LoadSource(resource, logger)
      }
    })
    return this
  }

  getDataSource (key) {
    if (!this.datasources[key]) {
      throw new Error('unexist')
    }

    return this.datasources[key]
  }
}

export default Relational
