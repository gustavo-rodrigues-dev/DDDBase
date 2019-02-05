var yaml = require('js-yaml')
var fs = require('fs')

module.exports = {
  development: yaml.safeLoad(fs.readFileSync('./config.develop.yml', 'utf8')).db.relational[0],
  test: yaml.safeLoad(fs.readFileSync('./config.test.yml', 'utf8')).db.relational[0],
  production: yaml.safeLoad(fs.readFileSync('./config.production.yml', 'utf8')).db.relational[0]
}
