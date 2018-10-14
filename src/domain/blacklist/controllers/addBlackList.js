import { blacklistRepository } from '../../../infrastructure/repositories/index'
import MissingCpf from '../exceptions/missingCpf'
class AddBlacklist {
  static async add (input, output) {
    try {
      if (!input.cpf) {
        throw new MissingCpf()
      }

      const newBlacklist = await blacklistRepository.add(input.cpf)

      return output.status(200).json({
        success: true,
        msg: 'Saved successfully',
        data: newBlacklist
      })
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

export default AddBlacklist
