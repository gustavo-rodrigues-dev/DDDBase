import { isValid } from 'cpf'
import MissingCpf from '../exceptions/missingCpf'
import InvalidCpfCNumber from '../exceptions/invalidCpfCNumber'

class CpfValidator {
  static isValidDocument (cpf) {
    return isValid(cpf)
  }

  static isEmpty (cpf) {
    return !cpf
  }
  static validate (cpf) {
    if (this.isEmpty(cpf)) {
      throw new MissingCpf()
    }

    if (!this.isValidDocument(cpf)) {
      throw new InvalidCpfCNumber()
    }
  }
}

export default CpfValidator
