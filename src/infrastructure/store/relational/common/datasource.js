import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'

class BaseDatasource {
  constructor (config, logger = console) {
    this.env = config.env
    this.dialect = config.dialect
    this.database = config.database
    this.Driver = Sequelize
    this.models = []
    this.logger = logger
    this.instanceDriver = this.loadDriver(config)
  }

  loging (available = false, maxTime = 1000) {
    if (!available) {
      return false
    }

    return (msg, queryExecutionTime) => {
      let logData = {
        query: msg,
        profile: queryExecutionTime + ' milliseconds'
      }

      if (queryExecutionTime > maxTime) {
        logData.msg = 'SLOW QUERY'
        this.logger.warn(logData)
      } else {
        logData.msg = 'GOOD QUERY'
        this.logger.info(logData)
      }
    }
  }

  loadModels (dir) {
    let models = {}
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file)
      const model = this.instanceDriver.import(modelDir)

      if (model) {
        models[model.name] = model
      }
    })

    Object.keys(models).forEach(key => {
      if ('associate' in models[key]) {
        models[key].associate(models)
      }
    })

    this.models = models
  }

  loadDriver (config) {
    return new this.Driver(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      define: config.define,
      storage: config.storage,
      operatorsAliases: this.Driver.Op,
      sync: config.sync,
      logging: this.loging(config.debug.available, config.debug.maxTime),
      benchmark: config.debug.available
    })
  }

  async isAlive () {
    return this.instanceDriver.authenticate()
  }

  getModels () {
    return this.models
  }

  getModel (model) {
    return this.models[model]
  }
}

export default BaseDatasource
