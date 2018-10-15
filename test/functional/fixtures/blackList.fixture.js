const BlackList = global.datasource.models.blackList

export function emptyUsers () {
  return BlackList.destroy({
    where: {}
  })
}

export function invalidateTable () {
  return global.datasource.sequelize.queryInterface.renameColumn(BlackList.getTableName(), 'cpf', 'invalidate')
}

export function validateTable () {
  return global.datasource.sequelize.queryInterface.renameColumn(BlackList.getTableName(), 'invalidate', 'cpf')
}

export function createUser () {
  return BlackList.create({
    cpf: '58151575034'
  })
}
