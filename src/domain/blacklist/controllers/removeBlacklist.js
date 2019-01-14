import { blacklistRepository } from '../../../infrastructure/repositories/index'
import Controller from '../../common/controller'
import cpfValidator from '../validators/cpfValidator'
import { unmask } from '../transfoms/cpfTransform'

class RemoveBlackList extends Controller {
  async delete (input, output) {
    try {
      cpfValidator.validate(input.cpf)
      await blacklistRepository.remove(unmask(input.cpf))

      return output.sendStatus(204)
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

export default RemoveBlackList
