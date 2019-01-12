const BlackList = global.store.getDatasource('relational', 'blacklist').getModel('blackList')

export function emptyUsers () {
  return BlackList.destroy({
    where: {}
  })
}

export function invalidateTable () {
  return global.store.getDatasource('relational', 'blacklist').instanceDriver.queryInterface.renameColumn(BlackList.getTableName(), 'cpf', 'invalidate')
}

export function validateTable () {
  return global.store.getDatasource('relational', 'blacklist').instanceDriver.queryInterface.renameColumn(BlackList.getTableName(), 'invalidate', 'cpf')
}

export function createUser () {
  return BlackList.create({
    cpf: '58151575034'
  })
}
