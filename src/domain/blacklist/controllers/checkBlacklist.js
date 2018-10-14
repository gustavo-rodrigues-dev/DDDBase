import { blacklistRepository } from '../../../infrastructure/repositories/index'
import MissingCpf from '../exceptions/missingCpf'
class checkBlacklist {
  static async verify (input, output) {
    try {
      if (!input.cpf) {
        throw new MissingCpf()
      }

      const cpfIsBlocked = !!await blacklistRepository.contains(input.cpf)

      return output.status(200).json({
        success: true,
        msg: `CPF is ${cpfIsBlocked ? '' : 'not'} Blocked`,
        data: {
          isBlocked: cpfIsBlocked
        }
      })
    } catch (e) {
      let code = 500
      if (e.statusCode) {
        code = e.statusCode
      }

      output.status(code).json({
        success: false,
        msg: 'Error on check blacklist',
        data: e.message
      })
    }
  }
}

export default checkBlacklist
