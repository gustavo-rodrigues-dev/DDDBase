const config = {
  debug: {
    level: 'silly',
    available: false
  },
  secret: 'j~9z{WA1bV?4L:9',
  jwtSession: { session: false },
  port: process.env.PORT || 3001,
  db: {
    relational: [
      {
        username: '',
        password: '',
        database: 'blacklist',
        host: null,
        port: null,
        dialect: 'sqlite',
        storage: './database/db.test.sqlite',
        define: {
          underscored: false
        },
        debug: {
          maxTime: 1000,
          available: false
        },
        seederStorage: 'json',
        seederStoragePath: './database/migration.test.json'
      }
    ]
  }
}

module.exports = config
