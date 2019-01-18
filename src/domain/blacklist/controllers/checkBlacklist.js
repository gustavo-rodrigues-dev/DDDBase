
import { blacklistRepository } from '../../../infrastructure/repositories/index'
import InvalidCpfCNumber from '../exceptions/invalidCpfCNumber'
import MissingCpf from '../exceptions/missingCpf'
import Controller from '../../common/controller'
import cpfValidator from '../validators/cpfValidator'
import { unmask } from '../transfoms/cpfTransform'

class checkBlacklist extends Controller {
  async verify (input, output) {
    const cpf = unmask(input.cpf)
    try {
      if (!input.cpf) {
        throw new MissingCpf()
      }

      if (!cpfValidator.isValidDocument(input.cpf)) {
        throw new InvalidCpfCNumber()
      }

      const cpfIsBlocked = !!await blacklistRepository.contains(cpf)

      return output.status(200).json({
        success: true,
        msg: `CPF is${cpfIsBlocked ? '' : "n't"} Blocked`,
        data: {
          isBlocked: cpfIsBlocked
        }
      })
    } catch (e) {
      let code = 500
      if (e.statusCode) {
        code = e.statusCode
      }

      return output.status(code).json({
        success: false,
        msg: 'Error on check blacklist',
        detail: e.message
      })
    }
  }
}

export default checkBlacklist
