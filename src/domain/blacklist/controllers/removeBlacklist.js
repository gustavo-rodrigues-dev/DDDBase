import { blacklistRepository } from '../../../infrastructure/repositories/index'
import MissingCpf from '../exceptions/missingCpf'
class RemoveBlackList {
  static async delete (input, output) {
    try {
      if (!input.cpf) {
        throw new MissingCpf()
      }

      await blacklistRepository.remove(input.cpf)

      return output.sendStatus(204)
    } catch (e) {
      let code = 500
      if (e.code) {
        code = e.code
      }

      output.status(code).json({
        success: false,
        msg: 'Error on save blacklist',
        data: e.message
      })
    }
  }
}

export default RemoveBlackList
