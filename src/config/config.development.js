const config = {
  debug: {
    level: 'debug',
    available: true
  },
  secret: 'j~9z{WA1bV?4L:6',
  jwtSession: { session: false },
  port: 3000,
  db: {
    username: '',
    password: '',
    database: 'blacklist',
    host: null,
    port: null,
    dialect: 'sqlite',
    storage: './database/db.development.sqlite',
    seederStorage: 'json',
    seederStoragePath: './database/migration.development.json'
  }
}

module.exports = config
