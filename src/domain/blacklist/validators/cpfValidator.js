import { isValid } from 'cpf'

class CpfValidator {
  static isValidDocument (cpf) {
    return isValid(cpf)
  }

  static isEmpty (cpf) {
    return !cpf
  }
}

export default CpfValidator
