module.exports = {
  local: require(`./config.local`),
  development: require(`./config.development`).db.relational[0],
  test: require(`./config.test`).db.relational[0],
  production: require(`./config.production`)
}
