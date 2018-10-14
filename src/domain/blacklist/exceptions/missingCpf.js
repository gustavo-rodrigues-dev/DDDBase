import missingArgument from '../../../exceptions/missingArgument'

class MissingCpf extends missingArgument {
  constructor (...params) {
    super(...params)

    this.local = 'DOMAIN.BLACKLIST.CONTROLLER'
    this.message = 'Missing CPF number'
  }
}

export default MissingCpf
