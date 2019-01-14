import { blacklistRepository } from '../../../infrastructure/repositories/index'
import Controller from '../../common/controller'
import cpfValidator from '../validators/cpfValidator'
import { unmask, mask } from '../transfoms/cpfTransform'

class AddBlacklist extends Controller {
  async add (input, output) {
    try {
      cpfValidator.validate(input.cpf)
      const newBlacklist = await blacklistRepository.add(unmask(input.cpf))
      return output.status((newBlacklist.isNew ? 201 : 202)).json({
        success: true,
        msg: 'Saved successfully',
        data: mask(newBlacklist.data.cpf)
      })
    } catch (e) {
      let code = 500

      if (e.code) {
        code = e.code
      }

      return output.status(code).json({
        success: false,
        msg: 'Error on save blacklist',
        data: e.message
      })
    }
  }
}

export default AddBlacklist
