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
        data: newBlacklist.cpf
      })
    } catch (e) {
      let code = 500

      if (e.code) {
        code = e.code
      }

      if (e.errors[0].type === 'unique violation') {
        code = 301
      }

      if (code > 399) {
        return output.status(code).json({
          success: false,
          msg: 'Error on save blacklist',
          data: e
        })
      }

      return output.status(code).json({
        success: true,
        msg: 'Saved successfully',
        data: e.errors[0].value
      })
    }
  }
}

export default AddBlacklist
