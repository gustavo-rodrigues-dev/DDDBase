import { blacklistRepository } from '../../../infrastructure/repositories/index'
import Controller from '../../common/controller'
import cpfValidator from '../validators/cpfValidator'
import { unmask, mask } from '../transfoms/cpfTransform'

class AddBlacklist extends Controller {
  async add (input, output) {
    try {
      cpfValidator.validate(input.cpf)
      const newBlacklist = await blacklistRepository.add(unmask(input.cpf))
      const status = newBlacklist.isNew ? 201 : 202
      return output.status(status).json({
        success: true,
        msg: 'Saved successfully',
        data: mask(newBlacklist.data.cpf)
      })
    } catch (e) {
      let code = e.statusCode || 500

      return output.status(code).json({
        success: false,
        msg: 'Error on save blacklist',
        detail: e.message
      })
    }
  }
}

export default AddBlacklist
