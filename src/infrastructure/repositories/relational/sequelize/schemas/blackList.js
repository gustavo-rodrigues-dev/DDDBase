import { clear, format, isValid } from 'cpf'
import InvalidCpfNumber from '../../../exceptions/invalidCpfCNumber'

export default (sequelize, DataTypes) => {
  const blackList = sequelize.define(
    'blackList',
    {
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set (val) {
          this.setDataValue('cpf', clear(val))
        },
        get () {
          const cpf = this.getDataValue('cpf')
          return format(cpf)
        }
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
      ],
      validate: {
        cpfValidate () {
          if (!isValid(this.cpf)) {
            throw new InvalidCpfNumber()
          }
        }
      }
    }
  )

  return blackList
}
