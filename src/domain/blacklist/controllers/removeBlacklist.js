import { blacklistRepository } from '../../../infrastructure/repositories/index'
import InvalidCpfCNumber from '../exceptions/invalidCpfCNumber'
import MissingCpf from '../exceptions/missingCpf'
import Controller from '../../common/controller'
import cpfValidator from '../validators/cpfValidator'
import { unmask } from '../transfoms/cpfTransform'

class RemoveBlackList extends Controller {
  async delete (input, output) {
    try {
      if (!input.cpf) {
        throw new MissingCpf()
      }

      if (!cpfValidator.isValidDocument(input.cpf)) {
        throw new InvalidCpfCNumber()
      }

      await blacklistRepository.remove(unmask(input.cpf))

      return output.sendStatus(204)
    } catch (e) {
      let code = 500
      if (e.code) {
        code = e.code
      }

      return output.status(code).json({
        success: false,
        msg: 'Error on delete blacklist',
        detail: e.message
      })
    }
  }
}

export default RemoveBlackList
