'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('blackList', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        cpf: {
          type: Sequelize.STRING,
          defaultValue: false,
          allowNull: false,
          unique: true
        }
      })
      .then(() =>
        queryInterface.addIndex('blackList', {
          fields: ['cpf'],
          unique: true
        })
      )
  },

  down: queryInterface => {
    return queryInterface.dropTable('blackList')
  }
}
