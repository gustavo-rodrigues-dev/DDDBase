export default (sequelize, DataTypes) => {
  const blackList = sequelize.define(
    'blackList',
    {
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      timestamps: true,
      tableName: 'blackList',
      indexes: [
        {
          unique: true,
          fields: ['cpf']
        }
      ]
    }
  )

  return blackList
}
