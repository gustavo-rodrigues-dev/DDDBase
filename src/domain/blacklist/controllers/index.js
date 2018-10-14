import addBlackList from './addBlackList'
import checkBlacklist from './checkBlacklist'
import removeBlacklist from './removeBlacklist'

const BlacklistController = {
  addBlacklist: addBlackList.add,
  checkBlacklist: checkBlacklist.verify,
  removeBlacklist: removeBlacklist.delete
}

export default BlacklistController
