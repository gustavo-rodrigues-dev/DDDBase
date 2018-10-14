import { clear, isValid } from 'cpf'
import InvalidCpfCNumber from './exceptions/invalidCpfCNumber'
class BlackListRepository {
  constructor (model) {
    this.model = model
  }
  async add (cpf) {
    return this.model.create({
      cpf: cpf
    })
  }

  async remove (cpf) {
    return this.model.destroy({
      where: {
        cpf: clear(cpf)
      }
    })
  }

  async contains (cpf) {
    if (!isValid(cpf)) {
      throw new InvalidCpfCNumber()
    }

    return this.model.count({
      where: {
        cpf: clear(cpf)
      }
    })
  }
}

export default BlackListRepository
