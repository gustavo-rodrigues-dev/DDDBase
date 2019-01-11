class BlackListRepository {
  constructor (model) {
    this.stores = {
      relational: model.relational
    }
  }

  async add (cpf) {
    const blackList = await this.stores.relational.findCreateFind({
      where: {
        cpf: cpf
      },
      defaults: {
        cpf: cpf
      }
    })
    return {
      isNew: blackList[0].isNewRecord,
      data: blackList[0].dataValues
    }
  }

  async remove (cpf) {
    return this.stores.relational.destroy({
      where: {
        cpf: cpf
      }
    })
  }

  async contains (cpf) {
    return this.stores.relational.count({
      where: {
        cpf: cpf
      }
    })
  }
}

export default BlackListRepository
