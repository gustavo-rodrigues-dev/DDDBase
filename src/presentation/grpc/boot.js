import grpc from 'grpc'
import BlackListController from '../grpc/routes/blacklist'
import app from './app'

export default function main (config) {
  var server = new grpc.Server()
  server.addService(app.ddd_base.blacklist.ProviderBrokerService.service, {
    addBlackList: (call) => {
      return BlackListController.addBlacklist(call)
    },
    checkBlacklist: (call) => {
      return BlackListController.checkBlacklist(call)
    },
    removeBlacklist: (call) => {
      return BlackListController.removeBlacklist(call)
    }
  })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())

  return server.start()
}
