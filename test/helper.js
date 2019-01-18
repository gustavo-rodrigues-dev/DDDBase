import grpc from 'grpc'
import { loadSync } from '@grpc/proto-loader'
import { resolve as resolvePath } from 'path'
import assert from 'assert'
import supertest from 'supertest'
import http from '../src/index'
import grpcServer from '../src/grpc'
import { store } from '../src/infrastructure/repositories/index'
import Output from '../src/lib/output'

const PROTO_PATH = resolvePath('src/presentation/grpc/proto/blacklist.proto')

global.appHttp = http
global.Output = Output
global.config = http.get('config')
global.store = store
global.assert = assert
global.request = supertest(http)
global.grpcServer = grpcServer
global.packageDefinition = loadSync(
  PROTO_PATH,
  {
    // keepCase: true,
    // longs: String,
    // enums: String,
    // defaults: true,
    // oneofs: true
  }
)
global.protoDescriptor = grpc.loadPackageDefinition(global.packageDefinition)
global.GrpcService = global.protoDescriptor.ddd_base.blacklist.ProviderBrokerService
global.grpcCLient = new global.GrpcService('localhost:50051', grpc.credentials.createInsecure())
