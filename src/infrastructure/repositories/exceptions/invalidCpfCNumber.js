import InvalidArgument from '../../../exceptions/invalidArgument'

class InvalidCpfNumber extends InvalidArgument {
  constructor (...params) {
    super(...params)

    this.local = 'INFRAESTRUCTURE.REPOSITORY.BLACKLIST'
    this.message = 'Invalid CPF number'
  }

  getStatus () {
    return this.statusCode
  }
}

export default InvalidCpfNumber
